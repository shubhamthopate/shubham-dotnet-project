﻿
var dataTable;
$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT-load').DataTable({
        "ajax": {
            "url": "/api/book",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "auther", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                        <a href="/BookList/Upsert?id=${data}" class="btn btn-success text-white" style="cursor:pointer;width:70px">
                            Edit
                         </a>
                           &nbsp;
                           <a class="btn btn-danger text-white" style="cursor:pointer;width:70px"
                            onclick=Delete('/api/book?id='+${data})>
                            Delete
                         </a>
                </div>`;
                },
                "width": "40%"

            }
        ],
        "language": {
            "emptyTable": "no Data found"
        },
        "width": "100%"

    })
}
function Delete(urls) {
    console.log(urls);
    swal({
        title: "Are you Sure?",
        text: "Once Deleted , cannot be able to recover",
        icon: "warning",
        button:true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: urls,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
    console.log(urls);
}



