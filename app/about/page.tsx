export default function AboutPage() {
  return (
    <div className="mt-10 flex justify-center">
      <p className=" max-w-3xl px-4 leading-relaxed text-gray-800">
        Your blog is a testament to modern web development, seamlessly
        integrating powerful technologies to create a robust and user-friendly
        platform. By leveraging Next.js for server-side rendering and static
        site generation, you’ve ensured optimal performance and SEO benefits.
        The use of Tailwind CSS allows for a highly customizable and responsive
        design, while shadcn/ui enhances the user interface with sleek and
        accessible components. NextAuth provides a secure and flexible
        authentication system, ensuring that user data is protected and login
        processes are streamlined. On the backend, Prisma and Supabase work in
        tandem to manage your database and provide real-time capabilities.
        Prisma’s ORM simplifies database interactions, making it easier to
        handle complex queries and mutations, while Supabase offers a scalable
        and reliable backend as a service. This combination ensures that your
        blog can handle a growing user base and increasing data demands.
        Overall, your blog showcases the power of combining these cutting-edge
        technologies to deliver a seamless and engaging user experience.
      </p>
    </div>
  );
}
