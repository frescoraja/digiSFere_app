class Listing < ActiveRecord::Base
	validates :title, :about, :type, :address, presence: true
	validates :type, numericality: { greater_than: 0, less_than: 6 }

	geocoded_by :address
	after_validation :geocode
end
