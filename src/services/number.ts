import { IModelServices, INumberModel, INumberCreateRequest, INumberUpdateRequest } from '../interfaces';
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

  public update = (data: INumberUpdateRequest) => NumberModel.ModelType.update({ _id: data._id }, data);

  public delete = (_id: number) => NumberModel.ModelType.deleteOne({ _id });
}

export default NumberService;
