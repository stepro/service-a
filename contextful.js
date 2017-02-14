var metaHeader = "context-headers";

function init(options) {
    if (options.metaHeader) {
        metaHeader = options.metaHeader.toLowerCase();
    }
}

function from(req, headers) {
    headers = headers || {};
    if (req.headers[metaHeader.toLowerCase()]) {
        headers[metaHeader] = req.headers[metaHeader];
        headers[metaHeader].split(",").forEach(function (header) {
            header = header.toLowerCase();
            if (header[header.length - 1] === "*") {
              header = header.slice(0, -1);
              for (var candidate in req.headers) {
                if (candidate.indexOf(header) === 0) {
                  headers[candidate] = req.headers[candidate];
                }
              }
            } else if (req.headers[header]) {
                headers[header] = req.headers[header];
            }
        });
    }
    return headers;
}
exports.from = from;
