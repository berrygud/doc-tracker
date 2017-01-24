import {Meteor} from 'meteor/meteor';
import nodeExcel from 'excel-export';
import {Documents, Logs} from '/lib/collections';
import moment from 'moment';

export default function () {

  WebApp.connectHandlers.use("/admin/excel", function(req, res, next) {

    let docId = req.url.replace('/', '');
    let doc = Documents.findOne({_id: docId});
    let docLogs = Logs.find({documentId: docId}).fetch();

    let conf ={};
    conf.name = "Report-" + doc.trackingId;
    conf.cols = [{
      caption:'Doc ID',
      type:'string'
    },{
      caption:'Tracking ID',
      type:'string'
    },{
      caption:'Office',
      type:'string'
    },{
      caption:'Description',
      type:'string'
    },{
      caption:'Date IN',
      type:'string'
    },{
      caption:'Date OUT',
      type:'string'
    },{
      caption:'Route',
      type:'string'
    },{
      caption:'Status',
      type:'string'
    }];

    let rowLogs = docLogs.map((docLog, i) => {

      let dateIn = moment(docLog.dateIn).format('llll');
      let dateOut = moment(docLog.dateOut).format('llll');

      return [docLog._id, doc.trackingId, docLog.office, doc.description, dateIn, dateOut, docLog.route, docLog.endStatus];
    });

    conf.rows = rowLogs;
    let result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report-" + doc.trackingId + ".xlsx");
    res.end(result, 'binary');
    
  });

}
