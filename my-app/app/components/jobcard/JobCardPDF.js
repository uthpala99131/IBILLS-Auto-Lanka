import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 12,
    color: '#f87171'
  },
  section: {
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5
  },
  label: {
    width: '30%',
    fontWeight: 'bold'
  },
  value: {
    width: '70%'
  },
  table: {
    width: '100%',
    marginBottom: 15
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 5
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
    fontWeight: 'bold'
  },
  tableCol: {
    width: '25%',
    paddingHorizontal: 5
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#000'
  },
  totalLabel: {
    fontWeight: 'bold',
    marginRight: 10
  },
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    textAlign: 'center',
    fontSize: 10,
    color: '#666'
  }
});

const JobCardPDF = ({ jobCard }) => {
  const totalServices = jobCard.services.reduce((sum, service) => sum + service.charge, 0);
  const totalParts = jobCard.spareParts.reduce((sum, part) => sum + part.total, 0);
  const subtotal = totalServices + totalParts;
  const tax = jobCard.billGenerated ? jobCard.billDetails.tax : subtotal * 0.15;
  const discount = jobCard.billGenerated ? jobCard.billDetails.discount : 0;
  const total = subtotal + tax - discount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>IBILLS Auto Lanka</Text>
          <Text style={styles.subtitle}>Vehicle Service Bill</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Customer:</Text>
            <Text style={styles.value}>{jobCard.vehicle.customerName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contact:</Text>
            <Text style={styles.value}>{jobCard.vehicle.contactNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Job Card #:</Text>
            <Text style={styles.value}>{jobCard._id.substring(0, 8)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>
              {new Date(jobCard.billGenerated ? jobCard.billDetails.generatedAt : new Date()).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Make/Model:</Text>
            <Text style={styles.value}>{jobCard.vehicle.make} {jobCard.vehicle.model} ({jobCard.vehicle.year})</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Registration:</Text>
            <Text style={styles.value}>{jobCard.vehicle.registrationNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mileage:</Text>
            <Text style={styles.value}>{jobCard.vehicle.mileage} km</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services Performed</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCol}>Service</Text>
              <Text style={styles.tableCol}>Charge (LKR)</Text>
            </View>
            {jobCard.services.map((service, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{service.name}</Text>
                <Text style={styles.tableCol}>{service.charge.toFixed(2)}</Text>
              </View>
            ))}
            <View style={[styles.tableRow, { backgroundColor: '#f3f4f6' }]}>
              <Text style={[styles.tableCol, { fontWeight: 'bold' }]}>Total Services</Text>
              <Text style={[styles.tableCol, { fontWeight: 'bold' }]}>{totalServices.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {jobCard.spareParts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Spare Parts Used</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCol}>Part</Text>
                <Text style={styles.tableCol}>Qty</Text>
                <Text style={styles.tableCol}>Unit Price (LKR)</Text>
                <Text style={styles.tableCol}>Total (LKR)</Text>
              </View>
              {jobCard.spareParts.map((part, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCol}>{part.name}</Text>
                  <Text style={styles.tableCol}>{part.quantity}</Text>
                  <Text style={styles.tableCol}>{part.unitPrice.toFixed(2)}</Text>
                  <Text style={styles.tableCol}>{part.total.toFixed(2)}</Text>
                </View>
              ))}
              <View style={[styles.tableRow, { backgroundColor: '#f3f4f6' }]}>
                <Text style={[styles.tableCol, { fontWeight: 'bold' }]} colSpan={3}>Total Parts</Text>
                <Text style={[styles.tableCol, { fontWeight: 'bold' }]}>{totalParts.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal:</Text>
            <Text style={styles.value}>LKR {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tax (15%):</Text>
            <Text style={styles.value}>LKR {tax.toFixed(2)}</Text>
          </View>
          {discount > 0 && (
            <View style={styles.row}>
              <Text style={styles.label}>Discount:</Text>
              <Text style={styles.value}>- LKR {discount.toFixed(2)}</Text>
            </View>
          )}
          <View style={[styles.row, { marginTop: 10, paddingTop: 5, borderTopWidth: 1, borderTopColor: '#000' }]}>
            <Text style={[styles.label, { fontWeight: 'bold' }]}>Total:</Text>
            <Text style={[styles.value, { fontWeight: 'bold' }]}>LKR {total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Thank you for choosing IBILLS Auto Lanka</Text>
          <Text>For any inquiries, please contact us at +94 11 234 5678</Text>
        </View>
      </Page>
    </Document>
  );
};

export default JobCardPDF;