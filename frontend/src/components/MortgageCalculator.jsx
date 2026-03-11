import React, { useState, useEffect } from 'react';

const MortgageCalculator = ({ price }) => {
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [interestRate, setInterestRate] = useState(6.5);
    const [loanTerm, setLoanTerm] = useState(30);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const downPaymentAmount = (price * downPaymentPercent) / 100;
    const principal = price - downPaymentAmount;

    useEffect(() => {
        if (principal > 0 && interestRate > 0 && loanTerm > 0) {
            const r = interestRate / 100 / 12;
            const n = loanTerm * 12;
            const payment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            setMonthlyPayment(payment);
        } else {
            setMonthlyPayment(0);
        }
    }, [principal, interestRate, loanTerm]);

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-body">
                <h4 className="card-title fw-bold mb-4">Mortgage Calculator</h4>

                <div className="row g-3">
                    <div className="col-sm-6">
                        <label className="form-label text-muted small fw-semibold">Home Price</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input type="text" className="form-control" value={price.toLocaleString()} disabled />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <label className="form-label text-muted small fw-semibold">Down Payment ({downPaymentPercent}%)</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input
                                type="number"
                                className="form-control"
                                value={downPaymentAmount}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    if (price > 0) setDownPaymentPercent(Number(((val / price) * 100).toFixed(1)));
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <input
                            type="range"
                            className="form-range"
                            min="0" max="100"
                            value={downPaymentPercent}
                            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className="row g-3 mt-2">
                    <div className="col-sm-6">
                        <label className="form-label text-muted small fw-semibold">Interest Rate</label>
                        <div className="input-group mb-3">
                            <input
                                type="number"
                                step="0.1"
                                className="form-control"
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                            />
                            <span className="input-group-text">%</span>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <label className="form-label text-muted small fw-semibold">Loan Term</label>
                        <select className="form-select" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))}>
                            <option value={30}>30 Years Fixed</option>
                            <option value={20}>20 Years Fixed</option>
                            <option value={15}>15 Years Fixed</option>
                            <option value={10}>10 Years Fixed</option>
                        </select>
                    </div>
                </div>

                <hr className="my-4" />

                <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3 border">
                    <div className="fw-semibold">Estimated Monthly Payment</div>
                    <div className="fs-3 fw-bold text-primary">${Math.round(monthlyPayment).toLocaleString()}<span className="fs-6 text-muted fw-normal">/mo</span></div>
                </div>
                <small className="text-muted d-block mt-2 text-center" style={{ fontSize: '11px' }}>
                    *Principal and interest only. Does not include taxes, insurance, or HOA fees.
                </small>
            </div>
        </div>
    );
};

export default MortgageCalculator;
