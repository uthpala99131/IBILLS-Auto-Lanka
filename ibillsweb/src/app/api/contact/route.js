// ibillsweb/src/app/api/contact/route.js
export async function POST(request) {
    try {
      const { name, email, phone, message } = await request.json();
      
      // Here you would typically:
      // 1. Validate the input
      // 2. Send an email or save to database
      // 3. Return appropriate response
      
      // For now, we'll just log and return success
      console.log('New contact form submission:', { name, email, phone, message });
      
      return new Response(JSON.stringify({ 
        message: "Thank you for your message! We'll contact you soon." 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      return new Response(JSON.stringify({ 
        message: "Failed to send message. Please try again later." 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }