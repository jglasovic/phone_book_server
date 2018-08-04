import { IRepository, IAssetModel } from '../interfaces';
import AssetModel from '../models/assets';

class AssetsRepostory implements IRepository<IAssetModel> {
  private AssetModel: AssetModel = new AssetModel();

  public getAll = () =>
    this.AssetModel.ModelType.find(
      {},
      this.AssetModel.filter // filter auto-import mongoBD _id and __v
    );

  public getOne = (Id: number) => this.AssetModel.ModelType.findOne({ Id }, this.AssetModel.filter);

  public createOrUpdate = (data: IAssetModel[]) => {
    const QueryArray = data.map((item: IAssetModel) =>
      this.AssetModel.ModelType.update({ Id: item.Id }, item, { upsert: true })
    );
    return Promise.all(QueryArray);
  };

  public delete = (Id: number) => this.AssetModel.ModelType.deleteOne({ Id });
}

export default AssetsRepostory;
