import {
  IPersonCreateRequest,
  IDeletedMongoose,
  IPersonUpdateRequest,
  IError,
  IPersonModel,
  INumberModel,
} from '../interfaces';
import PersonModel from '../models/person';
import NumberModel from '../models/number';

class PersonService {
  public getAll = async () =>
    PersonModel.ModelType.find({}, PersonModel.filter) // find all persons with numbers and number types
      .populate({
        path: 'Numbers',
        populate: {
          path: '_type',
          model: 'Phone_type',
        },
        select: '-_person',
      })
      .exec();

  public getOne = (_id: string) =>
    PersonModel.ModelType.findOne({ _id }, PersonModel.filter) // find one person by _id with numbers and number types
      .populate({
        path: 'Numbers',
        populate: {
          path: '_type',
          model: 'Phone_type',
        },
      })
      .exec();

  public create = (data: IPersonCreateRequest): Promise<IPersonModel> =>
    new Promise(async (res, rej) => {
      try {
        const Numbers: INumberModel[] = await NumberModel.ModelType.create(data.Numbers); // create all numbers and get _ids
        data.Default = Numbers[0]._id; // set first as default
        data.Numbers.forEach((num, i) => (num.Default ? (data.Default = Numbers[i]._id) : null)); // check if user set default ad rewrite first
        data.Numbers = Numbers.map(num => num._id); // map all number _ids for Person schema
        const Person: IPersonModel = await PersonModel.ModelType.create(data); // create Person
        res(Person);
      } catch (err) {
        rej(err);
      }
    });

  public update = (data: IPersonUpdateRequest) =>
    PersonModel.ModelType.findByIdAndUpdate(data._id, data, { new: true })
      .populate({
        path: 'Numbers',
        populate: {
          path: '_type',
          model: 'Phone_type',
        },
        select: '-_person',
      })
      .exec(); // update person

  public delete = (_id: string): Promise<{ message: string; _id: string }> =>
    new Promise(async (res, rej) => {
      try {
        const deletedNumbers: IDeletedMongoose = await NumberModel.ModelType.deleteMany({ _person: _id }).exec(); // delete all person numbers
        if (deletedNumbers.n === 0 || deletedNumbers.ok === 0) {
          const err: IError = {
            Error: 'Delete failure!',
            message: 'Delete Numbers error, Unknown person _id!',
            data: { _id },
          };
          rej(err);
        }
        const deletedPerson: IDeletedMongoose = await PersonModel.ModelType.deleteOne({ _id }).exec(); // delete person
        if (deletedPerson.n !== 1 || deletedPerson.ok !== 1) {
          const err: IError = {
            Error: 'Delete failure!',
            message: 'Delete Person error, Unknown person _id!',
            data: { _id },
          };
          rej(err);
        }
        res({ message: 'Deleted!', _id });
      } catch (err) {
        rej(err);
      }
    });
}

export default PersonService;
