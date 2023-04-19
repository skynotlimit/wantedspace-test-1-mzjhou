import { useState } from "react";

import { PastCareer } from "../types";
type CareerFormProps = {
  title: string;
  items: {
    id: number;
    ca_title: string;
    ca_start_date: string;
    ca_end_date: string;
  }[];
  onItemsChange: (newItems: any[]) => void;
};

const PastCareers = ({ title, items, onItemsChange }: CareerFormProps) => {
  const [pastCareer, setPastCareer] = useState<PastCareer[]>([]);
  const [toBeDeletedPastCareer, setToBeDeletedPastCareer] = useState<
    Array<any>
  >([]);
  const handleTitleChange = (id: number, newValue: string) => {
    onItemsChange(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, ca_title: newValue };
        }
        return item;
      })
    );
  };

  const handleStartDateChange = (id: number, newValue: string) => {
    onItemsChange(
      items.map((item) => {
        if (item.id === id) {
          const prevEndDate = item.ca_end_date;
          if (prevEndDate && prevEndDate < newValue) {
            // 뒤에 날짜가 앞에 날짜보다 앞설 경우, 기존의 end_date와 같거나 큰 날짜로 설정합니다.
            return { ...item, ca_start_date: prevEndDate };
          } else {
            return { ...item, ca_start_date: newValue };
          }
        }
        return item;
      })
    );
  };

  const handleEndDateChange = (id: number, newValue: string) => {
    onItemsChange(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, ca_end_date: newValue };
        }
        return item;
      })
    );
  };

  const handleDelete = (id: number) => {
    onItemsChange(items.filter((item) => item.id !== id));
  };
  const handleMoveCareerItem = (from: number, to: number) => {
    setPastCareer((p) => {
      const moved = [...p];
      moved.splice(to, 0, moved.splice(from, 1)[0]);
      return moved;
    });
  };

  return (
    <div>
      <h2>전 직장 경력</h2>

      <div>
        {pastCareer.map((item, index) => {
          return (
            <div key={item.id}>
              <div>
                <label>회사명</label>
                <input
                  type="text"
                  value={item.ca_title}
                  onChange={(e) => {
                    setPastCareer((p) => {
                      return p.map((prevItem) => {
                        if (prevItem.id == item.id) {
                          return {
                            ...prevItem,
                            ca_title: e.target.value,
                          };
                        }

                        return prevItem;
                      });
                    });
                  }}
                />
              </div>
              <div>
                <label>근무기간</label>
                <input
                  type="date"
                  value={item.ca_start_date}
                  onChange={(e) => {
                    const newStartDate = e.target.value;
                    setPastCareer((p) => {
                      return p.map((prevItem) => {
                        if (prevItem.id == item.id) {
                          const prevEndDate = prevItem.ca_end_date;
                          if (prevEndDate && prevEndDate < newStartDate) {
                            // 뒤에 날짜가 앞에 날짜보다 앞설 경우, 기존의 end_date와 같거나 큰 날짜로 설정합니다.
                            return {
                              ...prevItem,
                              ca_start_date: prevEndDate,
                            };
                          } else {
                            return {
                              ...prevItem,
                              ca_start_date: newStartDate,
                            };
                          }
                        }
                        return prevItem;
                      });
                    });
                  }}
                />
                <input
                  type="date"
                  value={item.ca_end_date}
                  onChange={(e) => {
                    const newEndDate = e.target.value;
                    setPastCareer((p) => {
                      return p.map((prevItem) => {
                        if (prevItem.id == item.id) {
                          const prevStartDate = prevItem.ca_start_date;
                          if (prevStartDate && prevStartDate > newEndDate) {
                            // 앞에 날짜가 뒤에 날짜보다 앞설 경우, 기존의 start_date와 같거나 작은 날짜로 설정합니다.
                            return {
                              ...prevItem,
                              ca_end_date: prevStartDate,
                            };
                          } else {
                            return {
                              ...prevItem,
                              ca_end_date: newEndDate,
                            };
                          }
                        }
                        return prevItem;
                      });
                    });
                  }}
                />
              </div>
              <div>
                <label>직급/직책</label>
                <input
                  type="text"
                  value={item.ca_rank}
                  onChange={(e) => {
                    setPastCareer((p) => {
                      return p.map((prevItem) => {
                        if (prevItem.id == item.id) {
                          return {
                            ...prevItem,
                            ca_rank: e.target.value,
                          };
                        }

                        return prevItem;
                      });
                    });
                  }}
                />
              </div>
              <div>
                <label>고용형태</label>
                <select
                  value={item.ca_contract}
                  onChange={(e) => {
                    setPastCareer((p) => {
                      return p.map((prevItem) => {
                        if (prevItem.id === item.id) {
                          return {
                            ...prevItem,
                            ca_contract: e.target.value,
                          };
                        }

                        return prevItem;
                      });
                    });
                  }}
                >
                  <option value="">선택</option>
                  <option value="FULL_TIME_1">정규직</option>
                  <option value="INTERN_1">계약직</option>
                  <option value="IRREGULAR_1">인턴</option>
                  <option value="PART_TIME_1">프리랜서</option>
                  <option value="FREELANCER_1">아르바이트</option>
                </select>
              </div>
              <div>
                <label>담당업무</label>
                <input
                  type="text"
                  value={item.ca_content}
                  onChange={(e) => {
                    setPastCareer((p) => {
                      return p.map((prevItem) => {
                        if (prevItem.id == item.id) {
                          return {
                            ...prevItem,
                            ca_content: e.target.value,
                          };
                        }

                        return prevItem;
                      });
                    });
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <button
                    onClick={() => handleMoveCareerItem(index, index - 1)}
                  >
                    위로
                  </button>
                  <button
                    onClick={() => handleMoveCareerItem(index, index + 1)}
                  >
                    아래로
                  </button>
                </div>
                <button
                  onClick={() => {
                    setToBeDeletedPastCareer((p) => [...p, item.id]);
                    setPastCareer((p) =>
                      p.filter((prevItem) => prevItem.id !== item.id)
                    );
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          );
        })}

        <div>
          <button
            onClick={() => {
              const order = pastCareer.length + 1;

              setPastCareer((p) => [
                ...p,
                {
                  id: p.length + 1,
                  ca_title: "",
                  ca_content: "",
                  ca_rank: "",
                  ca_contract: "",
                  ca_start_date: "",
                  ca_end_date: "",
                  ca_date_type: "",
                  order,
                  draft: true,
                },
              ]);
            }}
          >
            + 추가하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PastCareers;
