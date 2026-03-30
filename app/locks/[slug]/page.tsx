interface Props {
  params: { slug: string };
}

async function getLock(slug: string) {

  const res = await fetch(
    `/api/locks`
  );

  const locks = await res.json();

  return locks.find((l: any) => l.slug === slug);
}

export default async function LockDetails({ params }: Props) {

  const lock = await getLock(params.slug);

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold">
        {lock.name}
      </h1>

      <div className="grid grid-cols-2 gap-10 mt-6">

        <div>
          {lock.images.map((img: string) => (
            <img key={img} src={img} className="mb-4" />
          ))}
        </div>

        <div>

          <p>{lock.description}</p>

          <h3 className="mt-6 font-bold">
            Features
          </h3>

          <ul>
            {lock.features.map((f: string) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>

        </div>

      </div>

    </div>
  );
}