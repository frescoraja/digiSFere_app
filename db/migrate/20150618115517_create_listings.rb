class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
    	t.string :title, null: false
    	t.text :about, null: false
    	t.string :address, null: false
    	t.float :longitude
    	t.float :latitude
    	t.string :img_url
    	t.string :website
    	t.integer :category, null: false

    	t.timestamps
    end
    add_index :listings, [:longitude, :latitude]
    add_index :listings, :title
    add_index :listings, :about
    add_index :listings, :address
    add_index :listings, :category
  end
end
