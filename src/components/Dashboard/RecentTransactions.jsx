import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const RecentTransactions = ({ transactions, onSeeMore }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Recent Transactions</h5>

                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowRight className='text-base' />
                </button>
            </div>

            <div className='mt-6'>
                {transactions?.length === 0 && (
                    <p className='text-sm text-gray-400'>No transactions found.</p>
                )}

                {[...transactions]
                    .sort((a, b) => new Date(b.date) - new Date(a.date)) // optional: newest first
                    .slice(0, 4) // optional: limit to 5 recent
                    .map(item => (
                        <TransactionInfoCard
                            key={item._id}
                            title={item.category || item.source || item.title || 'Unnamed'}
                            icon={item.icon}
                            date={moment(item.date).format('Do MMM YYYY')}
                            amount={item.amount}
                            type={item.type}
                            hideDeleteBtn
                        />

                    ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
