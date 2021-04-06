import React, { useEffect } from 'react';

const columnNames = [{
    columnName: "New"
},
{
    columnName: "In progress"
},
{
    columnName: "Done"
}
]



function BoardDetails() {
    useEffect(() => {
        const listDiv = document.getElementById('columns-list');
        const ul = document.createElement('ul');
        for (var i = 0; i < columnNames.length; ++i) {
            const li = document.createElement('li');
            li.innerHTML = columnNames[i].columnName;
            ul.appendChild(li);
        }
        listDiv.appendChild(ul);
    }, [])

    return (
        <div>
            <p>Board with columns will come here</p>
            <div className="list-of-columns" id="columns-list">
            </div>
        </div>
    )
}

export default BoardDetails;