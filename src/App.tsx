import { useEffect, useState } from 'react';

function App() {
  const [pastCareer, setPastCareer] = useState([]);
  const [toBeDeletedPastCareer, setToBeDeletedPastCareer] = useState([]);
  const [education, setEducation] = useState([]);
  const [toBeDeletedEducation, setToBeDeletedEducation] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/past_career')
      .then((r) => r.json())
      .then((data) => {
        setPastCareer(data.sort((a, b) => a.order - b.order));
      });

    fetch('http://localhost:3001/education')
      .then((r) => r.json())
      .then((data) => {
        setEducation(data.sort((a, b) => a.order - b.order));
      });
  }, []);

  return (
    <div>
      <div>
        <button
          onClick={async () => {
            await Promise.all(
              toBeDeletedPastCareer.map((id) => {
                return fetch(`http://localhost:3001/past_career/${id}`, {
                  method: 'DELETE',
                });
              })
            );
            await Promise.all(
              pastCareer
                .filter((item) => item.draft)
                .map((item) => {
                  delete item.id;
                  delete item.draft;

                  return fetch('http://localhost:3001/past_career', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(item),
                  });
                })
            );
            await Promise.all(
              pastCareer
                .filter((item) => !item.draft)
                .map((item) => {
                  return fetch(`http://localhost:3001/past_career/${item.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify(item),
                  });
                })
            );

            await fetch('http://localhost:3001/past_career')
              .then((r) => r.json())
              .then((data) => {
                setPastCareer(data.sort((a, b) => a.order - b.order));
              });

            await fetch('http://localhost:3001/education')
              .then((r) => r.json())
              .then((data) => {
                setEducation(data.sort((a, b) => a.order - b.order));
              });
          }}
        >
          저장
        </button>
      </div>

      <hr />

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
                    display: 'flex',
                    justifyContent: 'space-between',
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
                    ca_title: '',
                    ca_content: '',
                    ca_rank: '',
                    ca_contract: '',
                    ca_start_date: '',
                    ca_end_date: '',
                    ca_date_type: '',
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

        <hr />

        <h2>학력사항</h2>
        <div>
          {education.map((item) => {
            return (
              <div key={item.id}>
                <div>
                  <label>학교구분</label>
                  <select name="edu_class">
                    <option>선택</option>
                    <option value="GRADUATESCHOOL">대학원</option>
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
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <button onClick={() => {}}>위로</button>
                    <button onClick={() => {}}>아래로</button>
                  </div>
                  <button onClick={() => {}}>삭제</button>
                </div>
              </div>
            );
          })}

          <div>
            <button onClick={() => {}}>+ 추가하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
