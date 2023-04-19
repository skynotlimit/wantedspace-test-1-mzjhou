import { useState, useEffect } from "react";
import DataFetcher from "../Apis/DataFetcher";
import { useForm } from "react-hook-form";
import PastCareers from "./pastCareer";
import { PastCareer, Education } from "../types";
import EducationList from "./education";
const SubmitForm = () => {
  const [pastCareer, setPastCareer] = useState<PastCareer[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [toBeDeletedEducation, setToBeDeletedEducation] = useState<Array<any>>(
    []
  );

  async function onSubmit() {
    const deletePromises = toBeDeletedPastCareer.map((id) =>
      fetch(`http://localhost:3001/past_career/${id}`, {
        method: "DELETE",
      })
    );
    await Promise.allSettled(deletePromises);

    const postPromises = pastCareer
      .filter((item) => item.draft)
      .map((item) => {
        const newItem = { ...item };
        delete newItem.id;
        delete newItem.draft;
        return fetch("http://localhost:3001/past_career", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        });
      });
    const patchPromises = pastCareer
      .filter((item) => !item.draft)
      .map((item) =>
        fetch(`http://localhost:3001/past_career/${item.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(item),
        })
      );

    const [postResults, patchResults] = await Promise.allSettled([
      Promise.allSettled(postPromises),
      Promise.allSettled(patchPromises),
    ]);
    if (
      postResults.status === "fulfilled" &&
      patchResults.status === "fulfilled"
    ) {
      const [postResponses, patchResponses] = [
        postResults.value,
        patchResults.value,
      ];
      const responsePromises = [
        fetch("http://localhost:3001/past_career").then((r) => r.json()),
        fetch("http://localhost:3001/education").then((r) => r.json()),
      ];
      const [pastCareerData, educationData] = await Promise.allSettled(
        responsePromises
      );
      if (
        pastCareerData.status === "fulfilled" &&
        educationData.status === "fulfilled"
      ) {
        const [pastCareerResponse, educationResponse] = [
          pastCareerData.value,
          educationData.value,
        ];
        setPastCareer(pastCareerResponse.sort((a, b) => a.id - b.id));
        setEducation(educationResponse.sort((a, b) => a.id - b.id));
      }
    }
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PastCareer>();

  const handleMoveCareerItem = (from: number, to: number) => {
    setPastCareer((p) => {
      const moved = [...p];
      moved.splice(to, 0, moved.splice(from, 1)[0]);
      return moved;
    });
  };

  const handleMoveEduItem = (from: number, to: number) => {
    setEducation((p) => {
      const moved = [...p];
      moved.splice(to, 0, moved.splice(from, 1)[0]);
      return moved;
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DataFetcher
          url="http://localhost:3001/past_career"
          setter={setPastCareer}
        />
        <PastCareers
          title="PastCareer"
          items={pastCareer}
          onItemsChange={setPastCareer}
        />
        <hr />

        <h2>학력사항</h2>
        <EducationList setEducation={setEducation}></EducationList>
        {/* <div>
          <DataFetcher
            url="http://localhost:3001/education"
            setter={setEducation}
          />
          {education.map((item, index) => {
            return (
              <div key={item.id}>
                <div>
                  <label>학교구분</label>
                  <select name="edu_class">
                    <option>선택</option>
                    <option value="EduClass.GRADUATESCHOOL">대학원</option>
                    <option value="UNIVERSITY">대학교</option>
                    <option value="COLLEGE">전문대</option>
                    <option value="HIGHSCHOOL">고등학교</option>
                  </select>
                </div>
                <div>
                  <label>학교명</label>
                  <input type="text" name="edu_title" />
                </div>
                <div>
                  <label>재학기간</label>
                  <input type="date" name="edu_start_date" />
                  <input type="date" name="edu_end_date" />
                </div>
                <div>
                  <label>전공/계열</label>
                  <input type="text" name="edu_major" />
                </div>
                <div>
                  <label>졸업구분</label>
                  <select name="edu_degree">
                    <option>선택</option>
                    <option value="GRADUATED">졸업</option>
                    <option value="PHD">박사</option>
                    <option value="MASTER">석사</option>
                    <option value="BACHELOR">학사</option>
                    <option value="ATTENDING">재학</option>
                    <option value="EXCHANGE">교환학생</option>
                    <option value="LEAVE">중단</option>
                    <option value="ABSENCE">휴학</option>
                  </select>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <button
                      onClick={() => handleMoveEduItem(index, index - 1)}
                      disabled={index === 0}
                    >
                      위로
                    </button>
                    <button onClick={() => handleMoveEduItem(index, index + 1)}>
                      아래로
                    </button>
                  </div>
                  <button onClick={() => {}}>삭제</button>
                </div>
              </div>
            );
          })}

          <div>
            <button
              onClick={() => {
                const order = pastCareer.length + 1;

                setEducation((p) => [
                  ...p,
                  {
                    id: p.length + 1,
                    edu_title: "",
                    edu_class: "",
                    edu_major: "",
                    edu_start_date: "",
                    edu_end_date: "",
                    edu_degree: "",
                    order,
                    draft: true,
                  },
                ]);
              }}
            >
              + 추가하기
            </button>
          </div>
        </div> */}
        <hr />
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default SubmitForm;
