import { Schema, Model, model } from 'mongoose';
import { IPersonModel, INumber, IModelClass } from '../interfaces';

class PersonModel {
  public static filter: string = '-__v'; // filter auto-import mongoBD __v
  public static readonly ModelSchema: Schema = new Schema(
    {
      firstname: String,
      lastname: String,
      address: String,
      city: String,
      country: String,
      lat: Number,
      lng: Number,
      def: { type: Schema.Types.ObjectId, ref: 'Number' },
      numbers: [
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
