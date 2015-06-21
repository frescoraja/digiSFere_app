class Listing < ActiveRecord::Base
	validates :title, :about, :category, :address, :website, presence: true
	validates :category, numericality: { greater_than: 0, less_than: 6 }

	geocoded_by :address
	after_validation :geocode
end
