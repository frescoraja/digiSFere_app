class Api:ListingsController < ApplicationController
	def create
		@listing = Listing.new(listing_params)
		if @listing.save
			render json: :@listing
		else
			render json: @listing.errors.full_messages, status: :unprocessable_entity
		end
	end

	def index
		@listings = Listing.all
		render json: @listing
	end

	def show
		@listing = Listing.find_by_id(params[:id])
	end

	private
	def listing_params
		params
			.require(:listing)
			.permit(:title, :about, :address, :img_url, :type, :website)
	end
end