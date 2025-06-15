
import Layout from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">
              Last updated: March 15, 2024
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Visiondrill Career Explorer, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Use License</h2>
              <p className="text-muted-foreground mb-4">
                Permission is granted to temporarily access and use Visiondrill for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the platform</li>
                <li>Remove any copyright or other proprietary notations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
              <p className="text-muted-foreground mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
              <p className="text-muted-foreground mb-4">
                You may not use our service:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>For any unlawful purpose or to solicit others to perform acts</li>
                <li>To violate any international, federal, provincial, or state regulations or laws</li>
                <li>To transmit or procure the sending of any advertising or promotional material</li>
                <li>To impersonate or attempt to impersonate the company, employees, or other users</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Content</h2>
              <p className="text-muted-foreground">
                Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material. You are responsible for the content that you post to the service, including its legality, reliability, and appropriateness.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at legal@visiondrill.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
