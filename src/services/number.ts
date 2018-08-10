import { INumberModel, INumberCreateRequest, INumberUpdateRequest, IPersonModel, IError } from '../interfaces';
import NumberModel from '../models/number';
import PersonModel from '../models/person';

class NumberService {
  public getAll = (person: string): Promise<INumberModel[]> =>
    NumberModel.ModelType.find({ person })
      .populate({
        path: 'type',
        model: 'Phone_type',
      })
      .exec();

  public findByNumber = (Num: string): Promise<INumberModel[]> =>
    NumberModel.ModelType.find({ number: { $regex: `.*${Num}.*` } }) // search Number and populate with person data and phone type
      .populate({
        path: 'person',
        model: 'Person',
        select: '-numbers',
      })
      .populate({
        path: 'type',
        model: 'Phone_type',
      })
      .exec();

  public create = (data: INumberCreateRequest): Promise<INumberModel> =>
    new Promise(async (res, rej) => {
      try {
        const createNumber = await NumberModel.ModelType.create(data); // create new number
        const doc: { [k: string]: any } = {
          $push: { numbers: createNumber._id }, // options for Person, push _id to Numbers
        };
        if (data.def) {
          doc.def = createNumber._id; // if Default set _id
        }
        await PersonModel.ModelType.update({ _id: createNumber.person }, doc).exec(); // update Person
        res(createNumber);
      } catch (err) {
        rej(err);
      }
    });

  public update = (data: INumberUpdateRequest): Promise<INumberModel> =>
    new Promise(async (res, rej) => {
      try {
        const { def, ...rest } = data;
        const updatedNumber = (await NumberModel.ModelType.findByIdAndUpdate(rest._id, rest, {
          new: true,
        })
          .populate({
            path: 'type',
            model: 'Phone_type',
          })
          .exec()) as INumberModel;
        if (!updatedNumber) {
          const err: IError = {
            Error: 'Update failure!',
            message: 'Unknown _id',
            data: { _id: rest._id },
          };
          rej(err);
        }
        if (def) {
          await PersonModel.ModelType.findByIdAndUpdate(rest.person, { def: rest._id }).exec();
        }
        res(updatedNumber);
      } catch (err) {
        rej(err);
      }
    });

  public delete = (_id: number): Promise<{ message: string; data?: { person: string; _id: string }; _id?: string }> =>
    new Promise(async (res, rej) => {
      try {
        const deletedNumber = (await NumberModel.ModelType.findOneAndRemove({ _id }).exec()) as INumberModel; // delete number and get deleted data
        if (!deletedNumber) {
          // check delete
          const err: IError = {
            Error: 'Delete failure!',
            message: 'Unknown _id',
            data: { _id },
          };
          rej(err);
        }
        let Person = (await PersonModel.ModelType.findOne({ _id: deletedNumber.person })) as IPersonModel; // find person of deleted number to update
        if (Person.numbers.length === 1) {
          Person = (await PersonModel.ModelType.findOneAndRemove({
            // if last number, delete person
            _id: deletedNumber.person,
          }).exec()) as IPersonModel;
          res({
            message: 'Delete person last number and delete person!',
            data: { person: Person._id, _id: deletedNumber._id },
          });
        }
        const doc: { [k: string]: any } = {
          $pull: { Numbers: deletedNumber._id }, // options for Person, pull _id from Numbers
        };
        if (Person.def === deletedNumber._id) {
          doc.Default = Person.numbers[0] === deletedNumber._id ? Person.numbers[1] : Person.numbers[0]; // default number: first or second
        }
        await PersonModel.ModelType.update({ _id: Person._id }, doc).exec(); // update Person
        res({ message: 'Deleted number', _id: deletedNumber._id });
      } catch (err) {
        rej(err);
      }
    });
}

export default NumberService;
