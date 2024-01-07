import { Fragment } from 'react';

interface Props {
  data: Map<string, string>;
}

export default function ProductAccordion({ data }: Props) {
  const accordion = [];
  //let i = 0;

  Object.entries(data).map(([title, value], i) => {
    if (i != 0) {
      accordion.push(
        <Fragment key={i}>
        <div className="accordion-item">
          <h5 className="accordion-header" id={"heading" + i}>
            <button
              className="accordion-button border-bottom font-weight-bold py-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#collapse" + i}
              aria-expanded="false"
              aria-controls={"collapse" + i}
            >
              {title}
              <i
                className="collapse-close fa fa-plus text-xs pt-1 position-absolute end-0 me-3"
                aria-hidden="true"
              ></i>
              <i
                className="collapse-open fa fa-minus text-xs pt-1 position-absolute end-0 me-3"
                aria-hidden="true"
              ></i>
            </button>
          </h5>
          <div
            id={"collapse" + i}
            className="accordion-collapse collapse"
            aria-labelledby={"heading" + i}
            data-bs-parent="#accordionEcommerce"
          >
            <div className="accordion-body text-body text-sm opacity-8">
              {value}
            </div>
          </div>
        </div>
        </Fragment>
      );
    } else {
      accordion.push(
        <Fragment key={i}>
        <div className="accordion-item">
          <h5 className="accordion-header" id={"heading" + i}>
            <button
              className="accordion-button border-bottom font-weight-bold collapsed py-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#collapse" + i}
              aria-expanded="true"
              aria-controls={"collapse" + i}
            >
              {title}
              <i
                className="collapse-close fa fa-plus text-xs pt-1 position-absolute end-0 me-3"
                aria-hidden="true"
              ></i>
              <i
                className="collapse-open fa fa-minus text-xs pt-1 position-absolute end-0 me-3"
                aria-hidden="true"
              ></i>
            </button>
          </h5>
          <div
            id={"collapse" + i}
            className="accordion-collapse collapse show"
            aria-labelledby={"heading" + i}
            data-bs-parent="#accordionEcommerce"
          >
            <div className="accordion-body text-body text-sm opacity-8">
              {value}
            </div>
          </div>
        </div>
        </Fragment>
      );
    }
  });

  return (
    <>
      <div className="accordion mt-5" id="accordionEcommerce">
        {accordion}
      </div>
    </>
  );
}
