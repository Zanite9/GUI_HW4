$(document).ready(function () {
    // handle table generation on button click
    $("#generate-table").click(function (event) {
        event.preventDefault(); // prevent default form submission

        // get input values for min and max rows and columns
        const minRows = parseInt($("#min-rows").val());
        const maxRows = parseInt($("#max-rows").val());
        const minCols = parseInt($("#min-cols").val());
        const maxCols = parseInt($("#max-cols").val());

        // validate that min values are less than or equal to max values
        if (minRows > maxRows || minCols > maxCols) {
            alert("Min values must be less than or equal to Max values.");
            return;
        }

        // create a unique id for the table based on input values
        const tableId = `table-${minRows}-${maxRows}-${minCols}-${maxCols}`;
        if ($(`#${tableId}`).length === 0) {
            // add a new tab for the table if it doesn't already exist
            $("#tabs-list").append(
                `<li><a href="#${tableId}">${minRows}-${maxRows} x ${minCols}-${maxCols}</a><span class="ui-icon ui-icon-close" role="presentation">Remove</span></li>`
            );
            // create a div for the new table
            $("#tabs").append(`<div id="${tableId}"></div>`);
            // generate the table and add it to the new tab
            $(`#${tableId}`).html(generateTable(minRows, maxRows, minCols, maxCols));
            $("#tabs").tabs("refresh"); // refresh tabs to include the new one
        }
        // activate the newly created tab
        $("#tabs").tabs("option", "active", $("#tabs-list li").length - 1);
        adjustStickyHeaders(); // adjust headers to maintain sticky positions
    });

    // handle tab close button click
    $(document).on("click", "#tabs-list .ui-icon-close", function () {
        const panelId = $(this).closest("li").remove().attr("aria-controls"); // get the id of the panel to remove
        $(`#${panelId}`).remove(); // remove the associated panel
        $("#tabs").tabs("refresh"); // refresh tabs to reflect the removal
    });

    // generate a multiplication table based on input range
    function generateTable(minRows, maxRows, minCols, maxCols) {
        let table = "<table>";
        table += "<thead><tr><th></th>"; // add top-left empty cell
        for (let col = minCols; col <= maxCols; col++) {
            table += `<th>${col}</th>`; // add column headers
        }
        table += "</tr></thead><tbody>";
        for (let row = minRows; row <= maxRows; row++) {
            table += `<tr><th>${row}</th>`; // add row header
            for (let col = minCols; col <= maxCols; col++) {
                table += `<td>${row * col}</td>`; // add table cell with product
            }
            table += "</tr>";
        }
        table += "</tbody></table>";
        return table; // return the complete table
    }

    // adjust sticky headers for better visibility during scrolling
    function adjustStickyHeaders() {
        $("table th").css("position", "sticky").css("z-index", "2").css("background", "rgb(207, 191, 248)"); // make headers sticky
        $("table th:first-child").css("left", "0").css("z-index", "3"); // ensure left column headers stay visible
    }

    // adjust headers on window resize
    $(window).on("resize", function () {
        adjustStickyHeaders();
    });

    // adjust headers when switching tabs
    $("#tabs").on("tabsactivate", function () {
        adjustStickyHeaders();
    });
});
