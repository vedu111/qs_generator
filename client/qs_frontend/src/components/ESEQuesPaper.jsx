import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { Buffer } from "buffer";

function ESEQuesPaper({ setNum, exam, subject, set }) {
  let sect1 = [],
    sect2 = [],
    sect3 = [];
  set.forEach((item, index) => {
    if (index < 6) {
      sect1.push(item);
    } else if (index < 12) {
      sect2.push(item);
    } else {
      sect3.push(item);
    }
  });
  // const handleQuestionAlphabet = (i) => {
  //   let start;
  //   if (i === 6 || i === 7 || i === 8 || i === 9 || i === 10 || i === 11) {
  //     start = 97 + i - 6;
  //   } else if (i === 12 || i === 13 || i === 14 || i === 15 || i === 16) {
  //     start = 97 + i - 12;
  //   } else {
  //     start = 97 + i;
  //   }
  //   return String.fromCharCode(start) + ".";
  // };
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
  const mainTd = {
    border: "1.8px solid black",
    width: "40px",
    padding: "4px 0 4px 8px",
  };
  const td = {
    border: "1.8px solid black",
    width: "40px",
    padding: "4px 0 4px 8px",
  };
  const quesTd = {
    border: "1.8px solid black",
    width: "350px",
    padding: "4px 0 4px 8px",
  };
  const mainQuesTd = {
    border: "1.8px solid black",
    width: "400px",
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
    <div className="flex flex-col my-6">
      <div className="bg-white p-8 w-fit mx-auto" ref={pdfRef}>
        <div className="w-[800px]">
          <div className="mb-4">
            <img src="/tcetHeader.jpg" alt="" />
          </div>
          {/* <div className="text-center"> */}
          <div className="flex flex-col gap-1">
            <h1 className="text-center font-bold text-[18px]">
              END-SEMESTER EXAMINATION
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

          <div className="mt-2 border-x-[1.8px] border-t-[1.8px] border-black flex justify-between px-2">
            <div>Section-I</div>
            <div>
              Short Answer Questions (Answer any 05 questions out of 06)
              <br />
              (Fundamental, Core Types)
            </div>
            <div>(10 Marks)</div>
          </div>
          <table className="border-[1.8px] border-black w-full">
            <tbody>
              <tr className="text-center font-bold">
                <td style={mainTd}>Q.No.</td>
                <td style={mainTd}></td>
                <td style={mainTd}>Marks</td>
                <td style={mainTd}>CO</td>
                <td style={mainTd}>RBT Level</td>
                <td style={mainTd}>PI</td>
              </tr>
              {sect1.map((item, index) => (
                <>
                  <tr key={index} className="text-center">
                    <td style={mainTd}>{index + 1}</td>
                    {item.images.length > 0 ? ( // item.is_image === "y"
                      <td className="text-left" style={mainQuesTd}>
                        {item.questions}
                        <img
                          className="w-[400px] h-fit mx-auto mt-2"
                          src={`data:image/*;base64,${Buffer.from(
                            item.images[0].data,
                            "binary"
                          ).toString("base64")}`}
                          alt=""
                        />
                      </td>
                    ) : (
                      <td className="text-left" style={mainQuesTd}>
                        {item.questions}
                      </td>
                    )}
                    <td style={mainTd}>{item.marks}</td>
                    <td style={mainTd}>{item.co}</td>
                    <td style={mainTd}>{item.rbt}</td>
                    <td style={mainTd}>{item.pi}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <div className="border-x-[1.8px] border-black flex justify-between px-2">
            <div>Section-II</div>
            <div>
              Descriptive Answer Questions (Answer any 04 out of 06)
              <br />
              (Descriptive, Comprehension Types)
            </div>
            <div>(20 Marks)</div>
          </div>
          <table className="border-[1.8px] border-black w-full">
            <tbody>
              {sect2.map((item, index) => (
                <>
                  <tr key={index} className="text-center">
                    <td style={td}>{index + 1}</td>
                    {item.images.length > 0 ? ( // item.is_image === "y"
                      <td className="text-left" style={quesTd}>
                        {item.questions}
                        <img
                          className="w-[400px] h-fit mx-auto mt-2"
                          src={`data:image/*;base64,${Buffer.from(
                            item.images[0].data,
                            "binary"
                          ).toString("base64")}`}
                          alt=""
                        />
                      </td>
                    ) : (
                      <td className="text-left" style={quesTd}>
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
          <div className="border-x-[1.8px] border-black flex justify-between px-2">
            <div>Section-III</div>
            <div>
              Long Answer Questions (Answer any 03 out of 05)
              <br />
              (Application, Analytical, Evaluation, Design Type)
            </div>
            <div>(30 Marks)</div>
          </div>
          <table className="border-[1.8px] border-black w-full">
            <tbody>
              {sect3.map((item, index) => (
                <>
                  <tr key={index} className="text-center">
                    <td style={td}>{index + 1}</td>
                    {item.images.length > 0 ? ( // item.is_image === "y"
                      <td className="text-left" style={quesTd}>
                        {item.questions}
                        <img
                          className="w-[400px] h-fit mx-auto mt-2"
                          src={`data:image/*;base64,${Buffer.from(
                            item.images[0].data,
                            "binary"
                          ).toString("base64")}`}
                          alt=""
                        />
                      </td>
                    ) : (
                      <td className="text-left" style={quesTd}>
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

export default ESEQuesPaper;
