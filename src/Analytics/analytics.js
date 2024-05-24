import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";

import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

const Analytics = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [items, setItems] = useState([]);
  const [headerItems,setHeaderItems]=useState([]);
useEffect(()=>{
    if(items.length>0)
      {
        const headerItems = Object.keys(items[0]).map((key) => (
            key
          ));
      setHeaderItems(headerItems?headerItems:[]);
      
      }
},[items])
  const handleFileChange = (file) => {
    // Start file reading
    const reader = new FileReader();
    reader.onload = (e) => {
      // Processing the Excel file
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
     
      setItems(data);
      setIsUploaded(true);
      // Updating state with the new items and indicating upload success
  
    };
    reader.readAsBinaryString(file);
  };

  return (
    <>
      <div className="mt-2 ms-2 navBodyContainer">
        <div className="divContainer">
         <center><p className="text"> Upload Files</p></center>
          <div className="fileUploadLabel ms-3 mt-3">
           
            <FileUploader
              handleChange={handleFileChange}
              name="file"
              types={["XLS", "XLSX"]} // Specify the file types to accept
              onTypeError={(err) => alert(err)} // Optional: handle type error
              children={
                <p className="mt-3">
                  {isUploaded
                    ? "File uploaded successfully!"
                    : "Drag and drop a file here or click to select a file"}
                </p>
              }
            />
          </div>
        </div>
        <div className="analyticsBox">
          {items.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table custom-table custom-table-striped mt-3">
                  <thead>
                    <tr>
                      {Object.keys(items[0]).map((key, index) => (
                        <th key={index} scope="col">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        {Object.values(item).map((val, valIndex) => (
                          <td key={valIndex}>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="barClass">
                <BarChart
                  width={400}
                  height={300}
                  data={items}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={headerItems[0]} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey={headerItems[1]}
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                </BarChart>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Analytics;
