const About = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">O nama</h1>
      <div className="prose max-w-none">
        <p>
          B2B Platforma je vodeće mesto za povezivanje firmi u Srbiji. Naša misija je da
          olakšamo proces nabavke i prodaje između preduzeća, uz maksimalnu sigurnost i
          efikasnost.
        </p>
        
        <h2 className="mt-6">Naša vizija</h2>
        <p>
          Želimo da budemo prva destinacija za sve B2B transakcije u regionu, pružajući
          inovativna rešenja koja štede vreme i novac našim korisnicima.
        </p>
        
        <h2 className="mt-6">Naše vrednosti</h2>
        <ul>
          <li>Transparentnost u poslovanju</li>
          <li>Sigurnost transakcija</li>
          <li>Kvalitet usluge</li>
          <li>Korisnička podrška</li>
        </ul>
      </div>
    </div>
  );
};

export default About;