import {
  IModelServices,
  INumberModel,
  INumberCreateRequest,
  INumberUpdateRequest,
  IPersonModel,
  IError,
} from '../interfaces';
import NumberModel from '../models/number';
import PersonModel from '../models/person';

class NumberService {
  public getAll = (_person: string) =>
    NumberModel.ModelType.find(
      { _person },
      NumberModel.filter // filter auto-import mongoBD _id and __v
    ).populate({
      path: '_type',
      model: 'Phone_type',
      select: '-__v',
    });

  public findByNumber = (Num: string) =>
    NumberModel.ModelType.find({ Number: { $regex: `.*${Num}.*` } }, NumberModel.filter) // search Number and populate with person data and phone type
      .populate({
        path: '_person',
        model: 'Person',
        select: '-__v -Numbers',
      })
      .populate({
        path: '_type',
        model: 'Phone_type',
        select: '-__v',
      })
      .exec();

  public create = (data: INumberCreateRequest) =>
    new Promise(async (res, rej) => {
      try {
        const createNumber = await NumberModel.ModelType.create(data); // create new number
        const doc: { [k: string]: any } = {
          $push: { Numbers: createNumber._id }, // options for Person, push _id to Numbers
        };
        if (data.Default) {
          doc.Default = createNumber._id; // if Default set _id
        }
        const updatePerson = await PersonModel.ModelType.update({ _id: createNumber._person }, doc).exec(); // update Person
        res(updatePerson);
      } catch (err) {
        rej(err);
      }
    });

  public update = (data: INumberUpdateRequest) => NumberModel.ModelType.update({ _id: data._id }, data).exec();

  public delete = (_id: number) =>
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
        let Person = (await PersonModel.ModelType.findOne({ _id: deletedNumber._person })) as IPersonModel; // find person of deleted number to update
        if (Person.Numbers.length === 1) {
          Person = (await PersonModel.ModelType.findOneAndRemove({
            // if it was his last number, then delete person
            _id: deletedNumber._person,
          }).exec()) as IPersonModel;
          res({
            message: 'Delete person last number and delete person!',
            data: { _person: Person._id, _id: deletedNumber._id },
          });
        }
        const doc: { [k: string]: any } = {
          $pull: { Numbers: deletedNumber._id }, // options for Person, pull _id from Numbers
        };
        if (Person.Default === deletedNumber._id) {
          doc.Default = Person.Numbers[0] === deletedNumber._id ? Person.Numbers[1] : Person.Numbers[0]; // options if it was default number with first or second
        }
        await PersonModel.ModelType.update({ _id: Person._id }, doc).exec(); // update Person
        res({ message: 'Deleted number', _id: deletedNumber._id });
      } catch (err) {
        rej(err);
      }
    });
}

export default NumberService;
