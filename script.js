// Load table data from ./data/registry.json
// Format {'key': {'user': 'value', 'group': 'value', 'mapa_30': 'value', 'mapa_50': 'value', 'mapa_75': 'value', 'seg_fault': 'value', 'final_score': 'value', 'datetime': 'value'}}}
data = $.getJSON('./data/registry.json', function(data) {
    // Create table
    var table = document.createElement('table');
    table.setAttribute('id', 'result-table');
    table.setAttribute('class', 'table table-striped table-bordered');
    document.getElementById('table-container').appendChild(table);

    // Create table header
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.appendChild(document.createTextNode('Nombre'));
    tr.appendChild(th);
    th = document.createElement('th');
    th.appendChild(document.createTextNode('Grupo'));
    tr.appendChild(th);
    th = document.createElement('th');
    th.appendChild(document.createTextNode('mapa_30'));
    tr.appendChild(th);
    th = document.createElement('th');
    th.appendChild(document.createTextNode('mapa_50'));
    tr.appendChild(th);
    th = document.createElement('th');
    th.appendChild(document.createTextNode('mapa_75'));
    tr.appendChild(th);
    th = document.createElement('th');
    th.appendChild(document.createTextNode('SegFault'));
    tr.appendChild(th);
    th = document.createElement('th');
    th.appendChild(document.createTextNode('Total Score'));
    tr.appendChild(th);
    th = document.createElement('th');
    th.appendChild(document.createTextNode('Fecha'));
    tr.appendChild(th);
    thead.appendChild(tr);
    table.appendChild(thead);

    // Create table body
    var tbody = document.createElement('tbody');
    for (var key in data) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data[key]['user']));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(document.createTextNode(data[key]['group']));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(document.createTextNode(data[key]['mapa_30']));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(document.createTextNode(data[key]['mapa_50']));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(document.createTextNode(data[key]['mapa_75']));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(document.createTextNode(data[key]['seg_fault']));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(document.createTextNode(data[key]['final_score']));
        tr.appendChild(td);
        td = document.createElement('td');
        // Convert POSIX miliseconds to YYYY-MM-DD HH:mm:ss 
        let date = new Date(data[key]['datetime']);//.toLocaleString();//.slice(0, 19).replace('T', ' ');
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        date = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

        td.appendChild(document.createTextNode(date));
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    // Docu: https://datatables.net/manual/data/
    let number_format = DataTable.render.number( null, null, 2);
    // Transoform POSIX miliseconds to human readable date
    // let date_format = DataTable.render.moment('YYYY-MM-DD HH:mm:ss', 'from');
    let table_dom = new DataTable('#result-table', 
    {
        columns: [
            {select: 0, type: 'string'},
            {select: 1, type: 'string'},
            {select: 2, type: 'number', render: number_format},
            {select: 3, type: 'number', render: number_format},
            {select: 4, type: 'number', render: number_format},
            {select: 5, type: 'string'},
            // named: total_score
            {select: 6, type: 'number', render: number_format},
            {select: 7, type: 'datetime'},
            ],
            searchable: true,
            sortable: true,
            perPage: 10,
            layout: {
                top: '{select}{search}',
                bottom: '{info}{pager}'
                }
                }
                ).order([6, 'desc']).draw();
})

