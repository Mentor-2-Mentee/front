import { SetStateAction } from "react";
import { ImageFile } from "../../commonElements/ImageUpload";

interface HandleImageFileParams {
  rawImageFile: File;
  afterLoadCallBack: React.Dispatch<SetStateAction<ImageFile[]>>;
  uploadOnlyOne?: boolean;
}

export const handleImageFile = async ({
  rawImageFile,
  afterLoadCallBack,
  uploadOnlyOne,
}: HandleImageFileParams): Promise<void> => {
  try {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(rawImageFile);
    fileReader.onload = () => {
      if (fileReader.result === null) {
        throw new Error("read Result null");
      }

      if (uploadOnlyOne) {
        afterLoadCallBack([
          {
            fileData: rawImageFile,
            fileName: rawImageFile.name,
            imageURL: fileReader.result!.toString(),
          },
        ]);
        return;
      }

      afterLoadCallBack((currentValue) => {
        return [
          ...currentValue,
          {
            fileData: rawImageFile,
            fileName: rawImageFile.name,
            imageURL: fileReader.result!.toString(),
          },
        ];
      });
    };
  } catch (error) {
    throw error;
  }
};
