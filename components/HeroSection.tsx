export default function HeroSection() {
  return (
    <section className="relative h-[600px]">

      <video
        autoPlay
        muted
        loop
        className="absolute w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center">

        <h1 className="text-5xl font-bold">
          Secure What Matters Most
        </h1>

        <p className="mt-4 text-lg">
          Premium Locks for Homes & Businesses
        </p>

      </div>

    </section>
  );
}