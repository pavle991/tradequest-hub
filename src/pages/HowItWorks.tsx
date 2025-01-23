const HowItWorks = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Kako platforma funkcioniše</h1>
      <div className="prose max-w-none">
        <h2>Za kupce</h2>
        <p>1. Registrujte se na platformi</p>
        <p>2. Postavite upit za robu ili usluge koje su vam potrebne</p>
        <p>3. Dobijte ponude od kvalifikovanih dobavljača</p>
        <p>4. Izaberite najbolju ponudu i završite transakciju</p>
        
        <h2 className="mt-6">Za dobavljače</h2>
        <p>1. Registrujte se i navedite kategorije proizvoda koje nudite</p>
        <p>2. Dobijajte obaveštenja o relevantnim upitima</p>
        <p>3. Šaljite ponude potencijalnim kupcima</p>
        <p>4. Realizujte poslove preko naše sigurne platforme</p>
      </div>
    </div>
  );
};

export default HowItWorks;