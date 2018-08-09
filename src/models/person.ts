import { Schema, Model, model } from 'mongoose';
import { IPersonModel, INumber, IModelClass } from '../interfaces';

class PersonModel {
  public static filter: string = '-__v'; // filter auto-import mongoBD __v
  public static readonly ModelSchema: Schema = new Schema(
    {
      Firstname: String,
      Lastname: String,
      Address: String,
      City: String,
      Country: String,
      Lat: Number,
      Lng: Number,
      Default: { type: Schema.Types.ObjectId, ref: 'Number' },
      Numbers: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Number',
        },
      ],
    },
    { versionKey: false }
  );
  public static readonly ModelType: Model<IPersonModel> = model<IPersonModel>('Person', PersonModel.ModelSchema);
}

export default PersonModel;
