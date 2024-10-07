import React from "react";

const InvoiceCard = () => (
    <div className="col-md-6 col-xl-6">
        <div className="card invoice-card">
            <div className="card-header pb-0">
                <h4>All Invoices</h4>
                <div className="dropdown icon-dropdown">
                    <button className="btn dropdown-toggle" id="userdropdown4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="icon-more-alt"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userdropdown4">
                        <a className="dropdown-item" href="#">Weekly</a>
                        <a className="dropdown-item" href="#">Monthly</a>
                        <a className="dropdown-item" href="#">Yearly</a>
                    </div>
                </div>
            </div>
            <div className="card-body invoice-table checkbox-checked">
                <div className="table-responsive">
                    <table className="table" id="all-invoice">
                        <thead>
                            <tr>
                                <th className="form-check">
                                    <input className="form-check-input" type="checkbox" />
                                </th>
                                <th>Invoice Id</th>
                                <th>Client</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input className="form-check-input" type="checkbox" /></td>
                                <td>#202433</td>
                                <td>John Smith</td>
                                <td>$450.00</td>
                                <td>25 Jun 2023</td>
                                <td><span className="badge bg-light-success">Paid</span></td>
                            </tr>
                            {/* Add other table rows */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

export default InvoiceCard;
