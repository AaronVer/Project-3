/**
 * @author Cody Gonsowski & Jeffrey Lor
 */
import axios from "axios";
import config from "../../config";
import store from "../../store/Store";
import TransferSelection from "./TransferSelection";

//Implementing patch to fix Axios DDoS vulnerability.
import rateLimit from 'axios-rate-limit';

function Transfer(props) {
	// Use rate limit to prevent DDoS attacks
	const http = rateLimit(axios.create(), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })
	
	// post transfer transaction
	const postTransfer = (transaction) => {
		axios
			.post(`${config.url}accounts/transfer`, transaction, {
				headers: {
					token: store.getState().userReducer.token,
					userId: store.getState().userReducer.userId,
				},
			})
			.catch((error) => console.error(`Error: ${error}`));
	};

	// what the submit button should do
	const handleSubmit = (event) => {
		// prevent page reloading
		event.preventDefault();

		// create the transfer payload
		let transfer = {
			sourceAccountId: store.getState().transferReducer.sourceAccountId,
			destinationAccountId:
				store.getState().transferReducer.destinationAccountId,
			transaction: {
				description: event.target.description.value,
				transactionAmount: event.target.transactionAmount.value,
			},
		};

		// perform the post
		postTransfer(transfer);
		// hacky workaround to try forcing the accounts list to update
		props.doTransactionDone(Date.now());
	};

	return (
		<div className="transfer-outer-container">
			<div className="transfer-inner-container">
				<div className="transfer-form">
					<p className="transfer-form-header">Transfer</p>

					<form id="transfer-inner-form" onSubmit={handleSubmit}>
						<div className="transfer-from-account">
							<label>From</label>
							<TransferSelection whichAccount="SOURCE"></TransferSelection>
						</div>

						<div className="transfer-to-account">
							<label>To</label>
							<TransferSelection whichAccount="DESTINATION"></TransferSelection>
						</div>

						<div className="transfer-amount">
							<label>Amount</label>
							<input
								type="number"
								min="0.00"
								step="0.01"
								id="transfer-input"
								name="transactionAmount"
							/>
						</div>

						<div className="transfer-description">
							<label>Description</label>
							<input type="text" id="transfer-description" name="description" />
						</div>

						<button type="submit">Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Transfer;
