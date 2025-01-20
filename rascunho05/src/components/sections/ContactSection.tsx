import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section className="py-20 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Reach Out Today</h2>
          <p className="text-gray-300 mb-8">
            Use the contact form to connect with us. We're eager to assist you and answer any questions you may have.
          </p>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 rounded-lg bg-[#222222] border-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-[#222222] border-none"
              />
            </div>
            <textarea
              placeholder="Message"
              rows={6}
              className="w-full p-3 rounded-lg bg-[#222222] border-none"
            />
            <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;