class Api::ListingsController < ApplicationController
	before_action :require_user!
	def create
		@listing = Listing.new(listing_params)
		if @listing.save
			render json: @listing
		else
			render json: @listing.errors.full_messages, status: :unprocessable_entity
		end
	end

	def search
    @listings = filter_listings(filter_options).order('category')
		render json: @listings
  end

	def show
		@listing = Listing.find_by_id(params[:id])
		render json: @listing
	end

	private
	def filter_options
		options = params[:filter_data] || {}
		defaults = {
			'lat' => [37.67767358309138, 37.8887756788066],
			'lng' => [-122.56501542968749, -122.26838457031249],
			'query' => "",
			'category' => []
		}

		defaults.merge(options)
	end

	def filter_listings(filter_data)
		binds = {
			lat_min: filter_data['lat'][0],
			lat_max: filter_data['lat'][1],
			lng_min: filter_data['lng'][0],
			lng_max: filter_data['lng'][1],
			query: filter_data['query'],
			category: filter_data['category']
		}

		find_queried_listings(binds)
	end

	def find_queried_listings(binds)
		listings = Arel::Table.new(:listings)
		if binds[:query].length > 0
			qry = "%#{binds[:query]}%"
			listings = Listing.where(listings[:title].matches(qry)
											 .or(listings[:about].matches(qry)
											 .or(listings[:website].matches(qry))))

		end
		results = Listing.where(listings[:category].not_in(binds[:category]))


		if binds[:lng_min].to_f > binds[:lng_max].to_f
			# Wrap around the International Date Line
			results.where(<<-SQL, binds)
				listings.longitude BETWEEN :lng_min AND 180
					OR listings.longitude BETWEEN -180 AND :lng_max
			SQL
		else
			results.where(<<-SQL, binds)
				listings.latitude BETWEEN :lat_min AND :lat_max
					AND listings.longitude BETWEEN :lng_min AND :lng_max
			SQL
		end
	end

	def listing_params
		params
			.require(:listing)
			.permit(:title, :about, :address, :img_url, :category, :website)
	end
end


# def filter_options
# 	options = params[:filter_data] || {}
# 	defaults = {
# 		'lat' => [37.67767358309138, 37.8887756788066],
# 		'lng' => [-122.56501542968749, -122.26838457031249],
# 		query: "",
# 		category: []
# 	}
#
# 	defaults.merge(options)
# end
#
# def filter_listings(filter_data)
# 	binds = {
# 		lat_min: filter_data['lat'][0],
# 		lat_max: filter_data['lat'][1],
# 		lng_min: filter_data['lng'][0],
# 		lng_max: filter_data['lng'][1],
# 	}
#
# 	if binds[:lng_min].to_f > binds[:lng_max].to_f
# 		# Wrap around the International Date Line
# 		Listing.where(<<-SQL, binds)
# 			listings.longitude BETWEEN :lng_min AND 180
# 				OR listings.longitude BETWEEN -180 AND :lng_max
# 		SQL
# 	else
# 		Listing.where(<<-SQL, binds)
# 			listings.latitude BETWEEN :lat_min AND :lat_max
# 				AND listings.longitude BETWEEN :lng_min AND :lng_max
# 		SQL
# 	end
# end
