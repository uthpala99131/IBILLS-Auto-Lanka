// ibillsweb/src/app/api/locations/route.js
export async function GET() {
    const locations = [
      {
        name: "iBills Auto Lanka Main Garage",
        address: "99/1/1 Medawela Road, Medawala 20000, Sri Lanka",
        phone: "070 208 6082",
        email: "isuruhemachandra25@gmail.com",
        hours: "24/7 Service Available",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.123456789012!2d80.5859884!3d7.3780719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3430073a611b1%3A0x837449f823e54a59!2sIBILLS%20AUTO%20LANKA%20MOTOR%20GARAGE%2C%2024%20x%207%20RECOVERY%20SERVICE!5e0!3m2!1sen!2slk!4v1621234567890!5m2!1sen!2slk"
      }
    ];
  
    return new Response(JSON.stringify(locations), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }