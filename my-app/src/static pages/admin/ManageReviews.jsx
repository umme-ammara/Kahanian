import Table from "react-bootstrap/Table";
import "./ManageReviews.css";

let data = [
    [0,5,"Extremely happy with the service! The quality was very nice, and it was exactly as shown in the pictures. "],
    [0,2,"Package received was ripped, not happy with the service"],
    [0,5,"Ordered 2 pieces and both lived up to expectations! Would definitely order again"],
    [1,1,"askdnakdsnaldnald ahahahah lolllllllllllllllllllllllll"]
]


function ManageReviews() {
    return (
        <Table size="sm" bordered hover className="customTable">
            <thead>
            <tr>
                <th>Flag</th>
                <th>Rating</th>
                <th>Review</th>
            </tr>
            </thead>

            <tbody>
            { data.map((row, i) => (
                <tr>
                    { row.map((value, j) => (
                        <td>{data[i][j]}</td>
                    ))}
                </tr>
            ))}                    
            </tbody>            

        </Table>
    )
}

export default ManageReviews;