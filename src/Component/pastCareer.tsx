const PastCareers = (pastCareer: any) => {
  return (
    <>
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
                    setPastCareer((p) => {
                      return p.map((prevItem) => {
                        if (prevItem.id == item.id) {
                          return {
                            ...prevItem,
                            ca_start_date: e.target.value,
                          };
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
                    setPastCareer((p) => {
                      return p.map((prevItem) => {
                        if (prevItem.id == item.id) {
                          return {
                            ...prevItem,
                            ca_end_date: e.target.value,
                          };
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
                        if (prevItem.id == item.id) {
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
                    onClick={() => {
                      const next = [...pastCareer];
                      const element = next.splice(index, 1)[0];
                      next.splice(index - 1, 0, element);

                      setPastCareer(
                        next.map((item, index) => {
                          return {
                            ...item,
                            order: index,
                          };
                        })
                      );
                    }}
                  >
                    위로
                  </button>
                  <button
                    onClick={() => {
                      const next = [...pastCareer];
                      const element = next.splice(index, 1)[0];
                      next.splice(index + 1, 0, element);

                      setPastCareer(
                        next.map((item, index) => {
                          return {
                            ...item,
                            order: index,
                          };
                        })
                      );
                    }}
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
                <div className="w-full h-fit flex flex-row justify-center items-center mt-7">
                  <button
                    onClick={async () => {
                      await Promise.all(
                        toBeDeletedPastCareer.map((id) => {
                          return fetch(
                            `http://localhost:3001/past_career/${id}`,
                            {
                              method: "DELETE",
                            }
                          );
                        })
                      );
                      await Promise.all(
                        pastCareer
                          .filter((item) => item.draft)
                          .map((item) => {
                            delete item.id;
                            delete item.draft;

                            return fetch("http://localhost:3001/past_career", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(item),
                            });
                          })
                      );
                      await Promise.all(
                        pastCareer
                          .filter((item) => !item.draft)
                          .map((item) => {
                            return fetch(
                              `http://localhost:3001/past_career/${item.id}`,
                              {
                                method: "PATCH",
                                headers: {
                                  "Content-type":
                                    "application/json; charset=UTF-8",
                                },
                                body: JSON.stringify(item),
                              }
                            );
                          })
                      );

                      await fetch("http://localhost:3001/past_career")
                        .then((r) => r.json())
                        .then((data) => {
                          setPastCareer(data.sort((a, b) => a.order - b.order));
                        });

                      await fetch("http://localhost:3001/education")
                        .then((r) => r.json())
                        .then((data) => {
                          setEducation(data.sort((a, b) => a.order - b.order));
                        });
                    }}
                  >
                    저장
                  </button>
                </div>
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
    </>
  );
};
export default PastCareers;
