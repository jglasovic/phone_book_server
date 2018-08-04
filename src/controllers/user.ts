import { IAssetModel, IAssetsResponse, IDeletedMongoose, IControllers } from '../interfaces';
import { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, getStatusText } from 'http-status-codes';
import { createError } from '../utils/error_log';
import { Request, Response } from 'express';

import AssetsRepository from '../repostories/assets';

class AssetController implements IControllers {
  private AssetsRepository: AssetsRepository = new AssetsRepository();
  private AssetsCollection?: IAssetModel | IAssetModel[] | null;
  private AssetsResponse: IAssetsResponse = {
    Assets: [],
  };

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      this.AssetsCollection = await this.AssetsRepository.getAll();
      this.AssetsResponse.Assets = this.AssetsCollection;
      return res.status(OK).json(this.AssetsResponse);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.params.id) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createError(getStatusText(UNPROCESSABLE_ENTITY), 'Param Id undefined!'));
      }
      this.AssetsCollection = await this.AssetsRepository.getOne(req.params.id);
      this.AssetsResponse.Assets = this.AssetsCollection ? [this.AssetsCollection] : [];
      return res.status(OK).json(this.AssetsResponse);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public createOrUpdate = async (req: Request, res: Response): Promise<Response> => {
    try {
      const AssetRequest: IAssetModel[] = req.body;
      if (!Array.isArray(AssetRequest) || !AssetRequest) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createError(getStatusText(UNPROCESSABLE_ENTITY), 'Wrong data request!'));
      }
      this.AssetsCollection = await this.AssetsRepository.createOrUpdate(AssetRequest);
      this.AssetsResponse.Assets = this.AssetsCollection || [];
      return res.status(OK).json(this.AssetsResponse);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.params.id) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createError(getStatusText(UNPROCESSABLE_ENTITY), 'Param Id undefined!'));
      }
      const deletedRes: IDeletedMongoose = await this.AssetsRepository.delete(req.params.id);
      if (deletedRes.n !== 1 || deletedRes.ok !== 1) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createError(getStatusText(UNPROCESSABLE_ENTITY), 'Wrong data request!'));
      }
      return res.status(OK).json({ message: 'Deleted!', Id: req.params.id });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };
}

export default new AssetController();
