import { tmdbImgBaseUrl } from "../services/call-headers.js";
import "../../styles/Selection.css";

const SelectionPurchases = ({ providers }) => {
  return (
    <div id="purchase-options">
      {providers.results.US.rent && (
        <div>
          <p className="title">Rent</p>
          <div className="purchase-provider-container">
            {providers.results.US.rent.map((provider) => (
              <div key={provider.provider_id} className="provider">
                <img
                  className="provider-image"
                  src={`${tmdbImgBaseUrl}${provider.logo_path}`}
                  alt={provider.provider_name}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {providers.results.US.buy && (
        <div>
          <p className="title">Buy</p>
          <div className="purchase-provider-container">
            {providers.results.US.buy.map((provider) => (
              <div key={provider.provider_id} className="provider">
                <img
                  className="provider-image"
                  src={`${tmdbImgBaseUrl}${provider.logo_path}`}
                  alt={provider.provider_name}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionPurchases;
