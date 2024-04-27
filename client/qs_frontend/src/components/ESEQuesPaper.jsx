function ESEQuesPaper({ exam, set }) {
    const td = {
      border: "1.8px solid black",
      width: "40px",
      padding: "4px 0 4px 8px",
    };
    const tableData = [
      {
        section: "I",
        type: "Short Answer Questions (Answer any 05 questions out of 06) (Fundamental, Core Types)",
        marks: 10,
        quesMarks: 2,
        arrSize: 6,
      },
      {
        section: "II",
        type: "Descriptive Answer Questions(Answer any 04 out of 06) (Descriptive, Comprehension Types)",
        marks: 20,
        quesMarks: 5,
        arrSize: 6,
      },
      {
        section: "III",
        type: "Long Answer Question (Answer any 03 out of 05) (Application, Analytical, Evaluation, Design Type)",
        marks: 30,
        quesMarks: 10,
        arrSize: 5,
      },
    ];

    return (
      <div className="bg-white p-8 w-fit my-6 mx-auto">
        <div className="w-[900px]">
          <div className="mb-4">
            <img src="/tcetHeader.jpg" alt="" />
          </div>
          <div className="text-center">
            <h1 className="font-bold text-[18px]">
              END SEMESTER EXAMINATION, DECEMBER 2023
            </h1>
            <h1 className="font-bold text-[18px]">
              S. E. /S.T./T.E./T.T./B.E./B.T. SEMESTER IV (CBCGS-HME 2020 /
              CBCGS-HME 2023)
            </h1>
          </div>
          <table className="w-full">
            <tbody>
              <tr>
                <td style={td}>Branch:</td>
                <td style={td}> </td>
                <td style={td}>Q.P. Code:</td>
                <td style={td}> </td>
              </tr>
              <tr>
                <td style={td}>Subject:</td>
                <td style={td}> </td>
                <td style={td}>Duration:</td>
                <td style={td}>2 hours</td>
              </tr>
              <tr>
                <td style={td}>Subject Code:</td>
                <td style={td}> </td>
                <td style={td}>Max. Marks:</td>
                <td style={td}>60</td>
              </tr>
            </tbody>
          </table>
          <div className="mb-10 flex gap-6">
            <p className="font-bold">Instructions:</p>
            <ol className="font-bold">
              <li>1. All sections are compulsory</li>
              <li>2. Figures to the right indicate full marks.</li>
              <li>
                3. Assume suitable data if necessary and state the assumptions
              </li>
            </ol>
          </div>
          {tableData.map((data, index) => (
            <table key={index} className="border-[1.8px] border-black w-full">
              <thead>
                <tr className="font-bold">
                  <td className="pl-2">Section-{data.section}</td>
                  <td colSpan={4} className="text-center">
                    {data.type}
                  </td>
                  <td className="pr-2 text-right">({data.marks}marks)</td>
                </tr>
              </thead>
              <tbody>
                {index === 0 && (
                  <tr className="font-bold">
                    <td style={td}>Q. NO.</td>
                    <td style={td}> </td>
                    <td style={td}>Marks</td>
                    <td style={td}>CO</td>
                    <td style={td}>RBT Level</td>
                    <td style={td}>PI</td>
                  </tr>
                )}
                {[...Array(data.arrSize)].map((_, index) => (
                  <tr key={index}>
                    <td style={td}>{index + 1}</td>
                    <td style={td}></td>
                    <td style={td}>{data.quesMarks}</td>
                    <td style={td}></td>
                    <td style={td}></td>
                    <td style={td}></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </div>
    );
  }

  export default ESEQuesPaper;
