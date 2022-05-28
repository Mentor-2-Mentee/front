import { styled } from "@mui/system";
import { useEffect } from "react";
import { FilterOptionButton } from "./FilterOptionButton";
import { AppliedOptions } from "./index";
export interface AppliedFilterOptionsProps {
  appliedOptions: AppliedOptions;
}

export const AppliedFilterOptions = ({
  appliedOptions,
}: AppliedFilterOptionsProps): JSX.Element => {
  const isNotActivateFilter: boolean =
    appliedOptions.parentElement === undefined &&
    appliedOptions.childElements.length === 0 &&
    appliedOptions.filterKeyword === "";

  useEffect(() => {
    console.log(appliedOptions);
  }, [appliedOptions]);
  return (
    <AppliedFilterOptionsContainer>
      {isNotActivateFilter ? (
        <div>필터가 적용되지 않음</div>
      ) : (
        <div style={{ display: "flex" }}>
          <div>
            {appliedOptions.filterKeyword === ""
              ? null
              : `키워드 : ${appliedOptions.filterKeyword}`}
          </div>
          <div>
            {appliedOptions.parentElement === undefined ? null : (
              <FilterOptionButton
                isSelected={true}
                buttonText={appliedOptions.parentElement.describeText}
              />
            )}
          </div>

          <div>
            {appliedOptions.childElements.length === 0
              ? null
              : appliedOptions.childElements.map((childElement) => {
                  return (
                    <FilterOptionButton
                      isSelected={true}
                      buttonText={childElement.describeText}
                    />
                  );
                })}
          </div>
        </div>
      )}
    </AppliedFilterOptionsContainer>
  );
};

const AppliedFilterOptionsContainer = styled("div")(({ theme }) => ({}));

export default AppliedFilterOptions;
