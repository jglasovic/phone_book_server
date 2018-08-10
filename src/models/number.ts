import { Schema, Model, model } from 'mongoose';
import { INumberModel, IModelClass } from '../interfaces';

class NumberModel {
  public static filter: string = '-__v'; // filter auto-import mongoBD __v
  public static readonly ModelSchema: Schema = new Schema(
    {
      number: String,
      person: { type: Schema.Types.ObjectId, ref: 'Person' },
      type: { type: Schema.Types.ObjectId, ref: 'Phone_type' },
    },
    { versionKey: false }
  ).index({ number: 'text' }); // set for search Numbers
  public static readonly ModelType: Model<INumberModel> = model<INumberModel>('Number', NumberModel.ModelSchema);
}

export default NumberModel;
