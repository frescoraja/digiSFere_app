class Api::ListingsController < ApplicationController
  def create
    @listing = Listing.new(listing_params)
    if @listing.save
      render json: @listing
    else
      render json: @listing.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    render json: Listing.all
  end

  def search
    filters = filter_options
    blacklist = filters[:category]
    whitelisted_listings = Listing.where.not(category: blacklist)
    @counts = {
      whitelisted: find_bound_listings(whitelisted_listings, filters).count,
      total: Listing.count
    }
    @listings = filter_listings(filters).order("updated_at desc")
  end

  def show
    @listing = Listing.find(params[:id])
    render json: @listing
  end

  private
  def filter_listings(filters)
    results = find_queried_listings(filters)
    find_bound_listings(results, filters)
  end

  def filter_options
    options = params[:filter_data] || {}
    defaults = {
      'lat' => [37.67767358309138, 37.8887756788066],
      'lng' => [-122.56501542968749, -122.26838457031249],
      'query' => "",
      'category' => []
    }

    filter_data = defaults.merge(options)

    {
      lat_min: filter_data['lat'][0],
      lat_max: filter_data['lat'][1],
      lng_min: filter_data['lng'][0],
      lng_max: filter_data['lng'][1],
      query: filter_data['query'],
      category: filter_data['category']
    }
  end

  def find_queried_listings(binds)
    results = Listing.where.not(category: binds[:category])

    if binds[:query].length > 0
      search_terms = binds[:query].split
      search_terms.each do |qry|
        term = "%#{qry}%"
        listings = Arel::Table.new(:listings)

        results.merge!(results.where(listings[:title].matches(term)
          .or(listings[:about].matches(term))
          .or(listings[:address].matches(term))
          .or(listings[:website].matches(term))))
      end
    end

    find_bound_listings(results, binds)
  end

  def find_bound_listings(listings, binds)
    results = listings

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
