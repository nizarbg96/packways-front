import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as logoFile from './packwayslogo.js';
import { formatDate } from '@angular/common';

// import * as Excel from 'exceljs/dist/exceljs.min.js';
// import * as ExcelProper from 'exceljs';

@Injectable({
  providedIn: 'root'
})
export class TripExcelService {
  dataclient: any = [];
 data: any;

  constructor() {

  }

  generateExcel(tripsData, nameuser, montantNet, mobile, adress) {
    // Excel Title, Header, Data
    const title = 'Rapport de livraison de client: ' + nameuser ;
    const header = ['REF', 'Status', 'Frais', 'Ville de destination', 'Postulation', 'Livraison', 'Déscription', 'Montant'];
      this.data = tripsData;

    console.log('dataexel:', tripsData);
    // Create workbook and worksheet
    // const workbook: ExcelProper.Workbook = new Excel.Workbook();
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Rapport de livraison');

    // Add Image
    const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });


    worksheet.mergeCells('B1:B3');
    worksheet.addImage(logo, 'B1:B3');
    // worksheet.addRow([]);

    // Add Row and formatting

    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    // worksheet.addRow([]);
    // worksheet.addRow(['Du: ' + startDate + ' Au: ' + endDate]);
    const subTitleRow = worksheet.addRow(['Date de génération: ' + formatDate(new Date(), 'd MMM yyyy HH:mm', 'en')]);

    // worksheet.mergeCells('G1:G3');
    // worksheet.addImage(logoRevomon, 'G1:G3');
    // worksheet.mergeCells('A4:G4');
    worksheet.mergeCells('A4:I4');
    worksheet.mergeCells('A5:I5');

    const num = worksheet.addRow(['Téléphone de Client: ' + mobile]);
    num.font = { name: 'Comic Sans MS', family: 4, size: 12, underline: true, bold: true };
    const adr = worksheet.addRow(['Adresse de Client: ' + adress]);
    adr.font = { name: 'Comic Sans MS', family: 4, size: 12, underline: true, bold: true };
    // Blank Row
    worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.alignment = {vertical: 'middle', horizontal: 'center'};
    });
    // worksheet.addRows(data);


    // Add Data and Conditional Formatting
    this.data.forEach(d => {
      const row = worksheet.addRow(d);
      row.alignment = {vertical: 'middle', horizontal: 'center'};
      const qty = row.getCell(2);
      let color = 'FF99FF99';
      if (qty.value !== 'Livree') {
        color = 'FF9999';
      }
      if (qty.value === '') {
        color = 'FFFFFF';
        row.font = { name: 'Comic Sans MS', family: 4, size: 11, underline: 'none', bold: true };
      }

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      };
    });
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 17;
    worksheet.getColumn(3).width = 6;
    worksheet.getColumn(4).width = 47;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 15;
    worksheet.getColumn(7).width = 15;

    worksheet.getColumn(4).alignment = {vertical: 'middle', horizontal: 'left'};
    worksheet.getRow(4).alignment = {vertical: 'middle', horizontal: 'center'};
    worksheet.getRow(5).alignment = {vertical: 'middle', horizontal: 'center'};

    // worksheet.addRow([]);
    // worksheet.addRow([]);
    // worksheet.addRow([]);

    // Footer Row
    const footerRow = worksheet.addRow(['Montant net: ' + montantNet]);
    footerRow.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true };
    footerRow.alignment = {vertical: 'middle', horizontal: 'right'};
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    // Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:G${footerRow.number}`);
    worksheet.addRow([]);
    worksheet.addRow([]);
    const footerRow2 = worksheet.addRow(['Merci de vérifier le montant et le retour.                Signature:']);
    // footerRow2.alignment = {vertical: 'middle', horizontal: 'right'};
    footerRow2.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true};
    worksheet.addRow([]);
    const footerRow3 = worksheet.addRow(['Remarque: .....................................']);
    footerRow3.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true};



    const nameReport = 'RapportDeLivraisonDe_' + nameuser + '.xlsx';   // .xlsx
    // tslint:disable-next-line:no-shadowed-variable
    workbook.xlsx.writeBuffer().then((buff: ArrayBuffer) => {
      // const blob = new Blob([buff as BlobPart], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const blob = new Blob([buff], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, nameReport);
    });

  }
  generateExcelDepenses(tripsData, nameuser, montantNet, mobile, adress) {
    // Excel Title, Header, Data
    const title = 'Rapport des dépenses : ';
    const header = ['Date de création','Type', 'Description', 'Montant', 'Affecté à', 'Source', 'Affecté par', 'Véhicule', 'Avance','Mois d\'avance', 'Autre Description', 'Autre Valeur','Dépense Bureautique',
      'Recharge Telephonique','Gasoile espèce','Maintenance véhicule'];
    this.data = tripsData;

    console.log('dataexel:', tripsData);
    // Create workbook and worksheet
    // const workbook: ExcelProper.Workbook = new Excel.Workbook();
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Rapport de dépenses');

    // Add Image
    const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });


    worksheet.mergeCells('B1:B3');
    worksheet.addImage(logo, 'B1:B3');
    // worksheet.addRow([]);

    // Add Row and formatting

    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    // worksheet.addRow([]);
    // worksheet.addRow(['Du: ' + startDate + ' Au: ' + endDate]);
    const subTitleRow = worksheet.addRow(['Date de génération: ' + formatDate(new Date(), 'd MMM yyyy HH:mm', 'en')]);

    // worksheet.mergeCells('G1:G3');
    // worksheet.addImage(logoRevomon, 'G1:G3');
    // worksheet.mergeCells('A4:G4');
    worksheet.mergeCells('A4:I4');
    worksheet.mergeCells('A5:I5');

    /*const num = worksheet.addRow(['Téléphone de Client: ' + mobile]);
    num.font = { name: 'Comic Sans MS', family: 4, size: 12, underline: true, bold: true };
    const adr = worksheet.addRow(['Adresse de Client: ' + adress]);
    adr.font = { name: 'Comic Sans MS', family: 4, size: 12, underline: true, bold: true };*/
    // Blank Row
    worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.alignment = {vertical: 'middle', horizontal: 'center'};
    });
    // worksheet.addRows(data);


    // Add Data and Conditional Formatting
    this.data.forEach(d => {
      const row = worksheet.addRow(d);
      row.alignment = {vertical: 'middle', horizontal: 'center'};
    });
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 20;
    for (let i=3; i<= tripsData[0].length ; i++){
      worksheet.getColumn(i).width = 20;
      worksheet.getRow(i).alignment = {vertical: 'middle', horizontal: 'center'};
    }

    // worksheet.addRow([]);
    // worksheet.addRow([]);
    // worksheet.addRow([]);

    // Footer Row
    /*const footerRow = worksheet.addRow(['Montant net: ' + montantNet]);
    footerRow.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true };
    footerRow.alignment = {vertical: 'middle', horizontal: 'right'};
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };*/

    // Merge Cells
    /*worksheet.mergeCells(`A${footerRow.number}:G${footerRow.number}`);
    worksheet.addRow([]);
    worksheet.addRow([]);
    const footerRow2 = worksheet.addRow(['Merci de vérifier le montant et le retour.                Signature:']);
    // footerRow2.alignment = {vertical: 'middle', horizontal: 'right'};
    footerRow2.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true};*/
    worksheet.addRow([]);
    const footerRow3 = worksheet.addRow(['Remarque: .....................................']);
    footerRow3.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true};



    const nameReport = 'Rapport Des Dépenses' + '.xlsx';   // .xlsx
    // tslint:disable-next-line:no-shadowed-variable
    workbook.xlsx.writeBuffer().then((buff: ArrayBuffer) => {
      // const blob = new Blob([buff as BlobPart], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const blob = new Blob([buff], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, nameReport);
    });

  }

  generateExcelActivityJour(tripsData, nameuser, montantNet, mobile, adress) {
    // Excel Title, Header, Data
    const title = 'Rapport d\'activité globale : ';
    const header = ['Jour','Entrepot', 'Non Livrés', 'Non Livrés Chez Livreur', 'Non Livrés Retour', 'Colis Livrés', 'Stops Livrés',  'Retournés', 'En cours de livraison', 'Totale dans l\'entrepot à 10h:00','Chez Livreur dans l\'entrepot à 10h:00',
      'Retour dans l\'entrepot à 10h:00','Ramassés','Non traités dans un pick up','Chez Livreur reçus par MU','Retour reçus par MU','Expédiés transit livraison','Expédiés transit retour','Valeur de colis livrés',
      'Valeur de dépenses', 'Valeur des montants récoltés '];
    this.data = tripsData;

    console.log('dataexel:', tripsData);
    // Create workbook and worksheet
    // const workbook: ExcelProper.Workbook = new Excel.Workbook();
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Rapport d\'activité globale');

    // Add Image
    const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });


    worksheet.mergeCells('B1:B3');
    worksheet.addImage(logo, 'B1:B3');
    // worksheet.addRow([]);

    // Add Row and formatting

    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    // worksheet.addRow([]);
    // worksheet.addRow(['Du: ' + startDate + ' Au: ' + endDate]);
    const subTitleRow = worksheet.addRow(['Date de génération: ' + formatDate(new Date(), 'd MMM yyyy HH:mm', 'en')]);

    // worksheet.mergeCells('G1:G3');
    // worksheet.addImage(logoRevomon, 'G1:G3');
    // worksheet.mergeCells('A4:G4');
    worksheet.mergeCells('A4:I4');
    worksheet.mergeCells('A5:I5');

    /*const num = worksheet.addRow(['Téléphone de Client: ' + mobile]);
    num.font = { name: 'Comic Sans MS', family: 4, size: 12, underline: true, bold: true };
    const adr = worksheet.addRow(['Adresse de Client: ' + adress]);
    adr.font = { name: 'Comic Sans MS', family: 4, size: 12, underline: true, bold: true };*/
    // Blank Row
    worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.alignment = {vertical: 'middle', horizontal: 'center'};
    });
    // worksheet.addRows(data);


    // Add Data and Conditional Formatting
    this.data.forEach(d => {
      const row = worksheet.addRow(d);
      row.alignment = {vertical: 'middle', horizontal: 'center'};
    });
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 20;
    for (let i=3; i<= tripsData[0].length ; i++){
      worksheet.getColumn(i).width = 20;
      worksheet.getRow(i).alignment = {vertical: 'middle', horizontal: 'center'};
    }

    // worksheet.addRow([]);
    // worksheet.addRow([]);
    // worksheet.addRow([]);

    // Footer Row
    /*const footerRow = worksheet.addRow(['Montant net: ' + montantNet]);
    footerRow.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true };
    footerRow.alignment = {vertical: 'middle', horizontal: 'right'};
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };*/

    // Merge Cells
    /*worksheet.mergeCells(`A${footerRow.number}:G${footerRow.number}`);
    worksheet.addRow([]);
    worksheet.addRow([]);
    const footerRow2 = worksheet.addRow(['Merci de vérifier le montant et le retour.                Signature:']);
    // footerRow2.alignment = {vertical: 'middle', horizontal: 'right'};
    footerRow2.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true};*/
    worksheet.addRow([]);
    const footerRow3 = worksheet.addRow(['Remarque: .....................................']);
    footerRow3.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true};



    const nameReport = 'Rapport Activity Globale' + '.xlsx';   // .xlsx
    // tslint:disable-next-line:no-shadowed-variable
    workbook.xlsx.writeBuffer().then((buff: ArrayBuffer) => {
      // const blob = new Blob([buff as BlobPart], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const blob = new Blob([buff], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, nameReport);
    });

  }
  generateExcelActivityDriver(tripsData, nameuser, montantNet, mobile, adress) {
    // Excel Title, Header, Data
    const title = 'Rapport d\'activité de livreurs : ';
    const header = ['Jour','Livreur','Entrepot', 'Non Livrés', 'Non Livrés Chez Livreur', 'Non Livrés Retour', 'Colis Livrés', 'Stops Livrés', 'Retournés', 'En cours de livraison', 'Totale dans l\'entrepot à 10h:00','Chez Livreur dans l\'entrepot à 10h:00',
      'Retour dans l\'entrepot à 10h:00','Ramassés','Non traités dans un pick up','Chez Livreur reçus par MU','Retour reçus par MU','Expédiés transit livraison','Expédiés transit retour','Valeur de colis livrés',
      'Valeur de dépenses', 'Valeur des montants récoltés '];
    this.data = tripsData;
    console.log('dataexel:', tripsData);
    // Create workbook and worksheet
    // const workbook: ExcelProper.Workbook = new Excel.Workbook();
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Rapport d\'activité globale');

    // Add Image
    const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });


    worksheet.mergeCells('B1:B3');
    worksheet.addImage(logo, 'B1:B3');
    // worksheet.addRow([]);

    // Add Row and formatting

    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    // worksheet.addRow([]);
    // worksheet.addRow(['Du: ' + startDate + ' Au: ' + endDate]);
    const subTitleRow = worksheet.addRow(['Date de génération: ' + formatDate(new Date(), 'd MMM yyyy HH:mm', 'en')]);

    // worksheet.mergeCells('G1:G3');
    // worksheet.addImage(logoRevomon, 'G1:G3');
    // worksheet.mergeCells('A4:G4');
    worksheet.mergeCells('A4:I4');
    worksheet.mergeCells('A5:I5');

    /*const num = worksheet.addRow(['Téléphone de Client: ' + mobile]);
    num.font = { name: 'Comic Sans MS', family: 4, size: 12, underline: true, bold: true };
    const adr = worksheet.addRow(['Adresse de Client: ' + adress]);
    adr.font = { name: 'Comic Sans MS', family: 4, size: 12, underline: true, bold: true };*/
    // Blank Row
    worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.alignment = {vertical: 'middle', horizontal: 'center'};
    });
    // worksheet.addRows(data);


    // Add Data and Conditional Formatting
    this.data.forEach(d => {
      const row = worksheet.addRow(d);
      row.alignment = {vertical: 'middle', horizontal: 'center'};
    });
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 20;
    for (let i=3; i<= tripsData[0].length ; i++){
      worksheet.getColumn(i).width = 20;
      worksheet.getRow(i).alignment = {vertical: 'middle', horizontal: 'center'};
    }

    // worksheet.addRow([]);
    // worksheet.addRow([]);
    // worksheet.addRow([]);

    // Footer Row
    /*const footerRow = worksheet.addRow(['Montant net: ' + montantNet]);
    footerRow.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true };
    footerRow.alignment = {vertical: 'middle', horizontal: 'right'};
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };*/

    // Merge Cells
    /*worksheet.mergeCells(`A${footerRow.number}:G${footerRow.number}`);
    worksheet.addRow([]);
    worksheet.addRow([]);
    const footerRow2 = worksheet.addRow(['Merci de vérifier le montant et le retour.                Signature:']);
    // footerRow2.alignment = {vertical: 'middle', horizontal: 'right'};
    footerRow2.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true};*/
    worksheet.addRow([]);
    const footerRow3 = worksheet.addRow(['Remarque: .....................................']);
    footerRow3.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true};



    const nameReport = 'Rapport Activité Livreurs' + '.xlsx';   // .xlsx
    // tslint:disable-next-line:no-shadowed-variable
    workbook.xlsx.writeBuffer().then((buff: ArrayBuffer) => {
      // const blob = new Blob([buff as BlobPart], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const blob = new Blob([buff], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, nameReport);
    });

  }
  generateExcelActivityClient(tripsData, nameuser, montantNet, mobile, adress) {
    // Excel Title, Header, Data
    const title = 'Rapport d\'activité globale : ';
    const header = ['Jour','Client', 'Non Livrés', 'Non Livrés Chez Livreur', 'Non Livrés Retour', 'Livrés', 'Retournés', 'En cours de livraison', 'Totale dans l\'entrepot à 10h:00','Chez Livreur dans l\'entrepot à 10h:00',
      'Retour dans l\'entrepot à 10h:00','Ramassés','Non traités dans un pick up','Chez Livreur reçus par MU','Retour reçus par MU','Expédiés transit livraison','Expédiés transit retour','Valeur de colis livrés',
      'Valeur de dépenses', 'Valeur des montants récoltés '];
    this.data = tripsData;

    console.log('dataexel:', tripsData);
    // Create workbook and worksheet
    // const workbook: ExcelProper.Workbook = new Excel.Workbook();
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Rapport d\'activité clients');

    // Add Image
    const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });


    worksheet.mergeCells('B1:B3');
    worksheet.addImage(logo, 'B1:B3');
    // worksheet.addRow([]);

    // Add Row and formatting

    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    // worksheet.addRow([]);
    // worksheet.addRow(['Du: ' + startDate + ' Au: ' + endDate]);
    const subTitleRow = worksheet.addRow(['Date de génération: ' + formatDate(new Date(), 'd MMM yyyy HH:mm', 'en')]);

    // worksheet.mergeCells('G1:G3');
    // worksheet.addImage(logoRevomon, 'G1:G3');
    // worksheet.mergeCells('A4:G4');
    worksheet.mergeCells('A4:I4');
    worksheet.mergeCells('A5:I5');

    /*const num = worksheet.addRow(['Téléphone de Client: ' + mobile]);
    num.font = { name: 'Comic Sans MS', family: 4, size: 12, underline: true, bold: true };
    const adr = worksheet.addRow(['Adresse de Client: ' + adress]);
    adr.font = { name: 'Comic Sans MS', family: 4, size: 12, underline: true, bold: true };*/
    // Blank Row
    worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.alignment = {vertical: 'middle', horizontal: 'center'};
    });
    // worksheet.addRows(data);


    // Add Data and Conditional Formatting
    this.data.forEach(d => {
      const row = worksheet.addRow(d);
      row.alignment = {vertical: 'middle', horizontal: 'center'};
    });
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 20;
    for (let i=3; i<= tripsData[0].length ; i++){
      worksheet.getColumn(i).width = 20;
      worksheet.getRow(i).alignment = {vertical: 'middle', horizontal: 'center'};
    }

    // worksheet.addRow([]);
    // worksheet.addRow([]);
    // worksheet.addRow([]);

    // Footer Row
    /*const footerRow = worksheet.addRow(['Montant net: ' + montantNet]);
    footerRow.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true };
    footerRow.alignment = {vertical: 'middle', horizontal: 'right'};
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };*/

    // Merge Cells
    /*worksheet.mergeCells(`A${footerRow.number}:G${footerRow.number}`);
    worksheet.addRow([]);
    worksheet.addRow([]);
    const footerRow2 = worksheet.addRow(['Merci de vérifier le montant et le retour.                Signature:']);
    // footerRow2.alignment = {vertical: 'middle', horizontal: 'right'};
    footerRow2.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true};*/
    worksheet.addRow([]);
    const footerRow3 = worksheet.addRow(['Remarque: .....................................']);
    footerRow3.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true};



    const nameReport = 'Rapport Activité Client' + '.xlsx';   // .xlsx
    // tslint:disable-next-line:no-shadowed-variable
    workbook.xlsx.writeBuffer().then((buff: ArrayBuffer) => {
      // const blob = new Blob([buff as BlobPart], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const blob = new Blob([buff], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, nameReport);
    });

  }



}
