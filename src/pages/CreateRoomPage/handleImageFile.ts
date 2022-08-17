import { SetStateAction } from "react";
import { ImageFile } from "../../commonElements/ImageUpload";

interface HandleImageFileParams {
  rawImageFile: File;
  afterLoadCallBack: React.Dispatch<SetStateAction<ImageFile[]>>;
}

export const handleImageFile = async ({
  rawImageFile,
  afterLoadCallBack,
}: HandleImageFileParams): Promise<void> => {
  try {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(rawImageFile);
    fileReader.onload = () => {
      if (fileReader.result === null) {
        throw new Error("read Result null");
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

export default handleImageFile;
