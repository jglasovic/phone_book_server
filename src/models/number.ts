import { Schema, Model, model } from 'mongoose';
import { INumberModel, IModelClass } from '../interfaces';

class NumberModel {
  public static filter: string = '-__v'; // filter auto-import mongoBD __v
  public static readonly ModelSchema: Schema = new Schema({
    Number: String,
    _person: { type: Schema.Types.ObjectId, ref: 'Person' },
    _type: { type: Schema.Types.ObjectId, ref: 'Phone_type' },
  }).index({ Number: 'text' });
  public static readonly ModelType: Model<INumberModel> = model<INumberModel>('Number', NumberModel.ModelSchema);
}

export default NumberModel;
