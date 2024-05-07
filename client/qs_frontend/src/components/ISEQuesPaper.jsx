import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { Buffer } from "buffer";

function ISEQuesPaper({ setNum, exam, subject, set }) {
  const handleQuestionAlphabet = (i) => {
    let start;
    if (i === 7 || i === 8) {
      start = 97 + i - 7;
    } else if (i === 9 || i === 10) {
      start = 97 + i - 9;
    } else {
      start = 97 + i;
    }
    return String.fromCharCode(start) + ".";
  };
  const pdfRef = useRef();
  const downloadPdf = () => {
    const input = pdfRef.current;
    if (!input) {
      console.error("Something went wrong. Please try again.");
      return;
    }
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      // const imgProps = pdf.getImageProperties(imgData);
      // const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      // pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`iseQuesPaper${setNum}.pdf`);
    });
  };
  const td = {
    border: "1.8px solid black",
    width: "fit-content",
    padding: "4px 16px 4px 16px",
  };
  const tableData = [
    {
      section: "I",
      type: "Short Answer Questions (Answer any 05 questions out of 07) (Fundamental, Core Types)",
      marks: 10,
      quesMarks: 2,
      arrSize: 7,
    },
    {
      section: "II",
      type: "Descriptive Answer Questions(Answer any 01 out of 02) (Descriptive, Comprehension Types)",
      marks: 5,
      quesMarks: 5,
      arrSize: 2,
    },
    {
      section: "III",
      type: "Long Answer Question (Answer any 01 out of 02) (Application, Analytical, Evaluation, Design Type)",
      marks: 5,
      quesMarks: 5,
      arrSize: 2,
    },
  ];

  return (
    <div className="flex flex-col my-6">
      <div className="bg-white p-8 w-fit mx-auto" ref={pdfRef}>
        <div className="w-[800px]">
          <div className="mb-4">
            <img src="/tcetHeader.jpg" alt="" />
          </div>
          {/* <div className="text-center"> */}
          <div className="flex flex-col gap-1">
            <h1 className="text-center font-bold text-[18px]">
              {exam === "ise1"
                ? "IN-SEMESTER EXAMINATION-1"
                : "IN-SEMESTER EXAMINATION-2"}
            </h1>
            <h1 className="text-center font-bold text-[18px]">
              SE (Semester-III)
            </h1>
            <h1 className="text-center font-bold text-[18px]">
              SUBJECT - {subject}
            </h1>
            {/* </div> */}
            <div className="flex justify-between">
              <p>Branch:</p>
              <p>Date:</p>
            </div>
            <div className="flex justify-between">
              <p>Div:</p>
              <p>Timing:</p>
            </div>
            <div className="flex justify-between">
              <p>Duration: 60 minutes</p>
              <p>Maximum marks: 20</p>
            </div>
            <p className="font-bold">Instructions:</p>
            <ol className="font-bold ml-20">
              <li>1. All sections are compulsory</li>
              <li>2. Figures to the right indicate full marks.</li>
              <li>
                3. Assume suitable data if necessary and state the assumptions
              </li>
              <li>
                4. Use of logarithmic table, drawing instruments and
                non-programmable calculators is permitted.
              </li>
              <li>5. Figures to the right indicate full marks.</li>
            </ol>
          </div>

          <table className="mt-2 border-[1.8px] border-black w-full">
            <tbody>
              <tr className="text-center font-bold">
                <td style={td}>Q.1</td>
                <td style={td}> </td>
                <td style={td}>Answer any 5 of the following questions</td>
                <td style={td}>Marks</td>
                <td style={td}>CO</td>
                <td style={td}>RBT Level</td>
                <td style={td}>PI</td>
              </tr>
              {set.map((item, index) => (
                <>
                  {index === 8 ? (
                    <tr>
                      <td style={td}></td>
                      <td style={td}></td>
                      <td style={td} className="text-center font-bold">OR</td>
                      <td style={td}></td>
                      <td style={td}></td>
                      <td style={td}></td>
                      <td style={td}></td>
                    </tr>
                  ) : index === 10 ? (
                    <tr>
                      <td style={td}></td>
                      <td style={td}></td>
                      <td style={td} className="text-center font-bold">OR</td>
                      <td style={td}></td>
                      <td style={td}></td>
                      <td style={td}></td>
                      <td style={td}></td>
                    </tr>
                  ) : (
                    ""
                  )}
                  <tr key={index} className="text-center">
                    <td style={td}>
                      {index === 7 ? "Q.2." : index === 9 ? "Q.3." : ""}
                    </td>
                    <td style={td}>{handleQuestionAlphabet(index)}</td>
                    {item.is_image === "y" ? (
                      <td className="text-left" style={td}>
                        <img
                          className="w-40 mx-auto"
                          src={`data:image/*;base64,${Buffer.from(
                            item.images[0].data,
                            "binary"
                          ).toString("base64")}`}
                          alt=""
                        />
                        {item.questions}
                      </td>
                    ) : (
                      <td className="text-left" style={td}>
                        {item.questions}
                      </td>
                    )}
                    <td style={td}>{item.marks}</td>
                    <td style={td}>{item.co}</td>
                    <td style={td}>{item.rbt}</td>
                    <td style={td}>{item.pi}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="button text-white mx-auto bg-blue-800 w-fit rounded-md p-2 cursor-pointer m-2"
        onClick={downloadPdf}
      >
        Download PDF
      </div>
    </div>
  );
}

export default ISEQuesPaper;
