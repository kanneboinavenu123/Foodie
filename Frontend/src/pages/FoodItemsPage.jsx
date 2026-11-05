import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ correct import
import { foodItems } from "../food/foodItems";

const FoodItemsPage = () => {

const sortedItems = [...foodItems].sort((a, b) => a.id - b.id);


  // 📄 Generate PDF Function
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Food Items List", 14, 20);


    const tableColumn = ["ID", "Name", "Category", "Price-₹"];
    const tableRows = [];

    foodItems.forEach((item) => {
      tableRows.push([item.id, item.name, item.category, item.price]);
    });

    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [255, 136, 0] }
    });

    // Footer
    const date = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.text(`Generated on: ${date}`, 14, doc.internal.pageSize.height - 10);

    // Save PDF
    doc.save("FoodItemsList.pdf");
  };

  return (
    <div className="food-items-container">
      <div className="header-section">
        <h2>🍽️ Food Items List</h2>
        <button className="download-btn" onClick={handleDownloadPDF}>
          ⬇️ Download PDF
        </button>
      </div>

      <table className="food-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img src={item.img} alt={item.alt} className="food-img" />
              </td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodItemsPage;
