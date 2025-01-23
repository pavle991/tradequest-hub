import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-gray-900">B2B Platforma</span>
            </div>
            <p className="mt-4 text-gray-600">
              Povezujemo firme kroz efikasna rešenja za nabavku.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Platforma</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-primary">
                  Kako funkcioniše
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-primary">
                  Cenovnik
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary">
                  Česta pitanja
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Kompanija</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary">
                  O nama
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary">
                  Privatnost
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Podrška</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-primary">
                  Pomoć
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary">
                  Uslovi korišćenja
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-gray-600 hover:text-primary">
                  Pravne informacije
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-gray-400 text-center">
            © {new Date().getFullYear()} B2B Platforma. Sva prava zadržana.
          </p>
        </div>
      </div>
    </footer>
  );
};