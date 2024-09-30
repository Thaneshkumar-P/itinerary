'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import BK from '@/assets/Burj.svg'
import { Button } from "@/components/ui/button"
import { Location, SVG, BasicInfo } from "@/models/Itinerary"


export default function FriendsPage() {

  const template = useSearchParams()
  const router = useRouter()

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    title: '',
    subTitle: '',
    template: '',
    days: 0,
    overview: '',
    meals: '',
    stay: '',
    transport: '',
    offer: '',
    client: ''
  })
  const [locations, setLocations] = useState<Location[]>([
    {
      locationName: "",
      locationDays: "",
      nights: "",
      date: "",
      locationStay: "",
      locationMeals: "",
      locationHighlight: "",
      overview: "",
      images: []
    }
  ]);
  const [toc, setTOC] = useState<SVG[]>([])
  const [included, setIncluded] = useState<SVG[]>([])
  const [excluded, setExcluded] = useState<SVG[]>([])

  useEffect(() => {
    const templateValue = template.get('t')?.toString() ?? '';
    
    if (templateValue) {
      setBasicInfo((prevBasicInfo) => ({
        ...prevBasicInfo,
        template: templateValue,
      }));
    } else {
      router.replace('/');
    }
  }, [template, router]); 

  const [svgTOC, setSVGTOC] = useState<SVG>({
    text: '',
    svg: ''
  });

  const uploadImageToSeaweedFS = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/storage/", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.fid;
  };
  
  const handleImageChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const updatedLocations = [...locations];
  
      for (const file of Array.from(files)) {
        const fileId = await uploadImageToSeaweedFS(file);
        updatedLocations[index].images.push(fileId);
      }
  
      setLocations(updatedLocations);
      e.target.value = ''
    }
  };

  const handleAddNewSVGName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSVGTOC({
      text: e.target.value,
      svg: svgTOC.svg
    })
  }

  const handleAddNewSVG =  async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if(file && file.length > 0){
      const fileId = await uploadImageToSeaweedFS(file[0]);
      console.log(fileId)
      e.target.value = ''
      setSVGTOC({
        text: svgTOC.text,
        svg: fileId
      })
    }
  }

  const handleAddTOC = async () => {
    const node = document.getElementById('toc-error')
    if(svgTOC.svg && svgTOC.text) {
      setTOC([ ...toc ,svgTOC])
      setSVGTOC({
        text: '',
        svg: ''
      })
      if(node)
        node.innerHTML = ''
    }
    else{
      if(node)
        node.innerHTML = 'Details Incomplete'
    }
  }

  const handleChangeBasicInfo = (field: keyof BasicInfo, value: string | number) => {
    setBasicInfo({
      ...basicInfo,
      [field]: value
    })
  }

  const handleAddIncluded = async () => {
    const svg = document.getElementById('included-svg') as HTMLInputElement
    const text = document.getElementById('included-name') as HTMLInputElement
    const error = document.getElementById('included-error')

    if(svg && text) {
      if(svg.files && text.value){
        const fileId = await uploadImageToSeaweedFS(svg.files[0])
        setIncluded([ ...included, { text: text.value, svg: fileId }])
        svg.value = ''
        text.value = ''
        if(error)
          error.innerHTML = ''
      }
    }
    else{
      if(error)
        error.innerHTML = 'Details Incomplete'
    }
  }

  const handleAddExcluded = async () => {
    const svg = document.getElementById('excluded-svg') as HTMLInputElement
    const text = document.getElementById('excluded-name') as HTMLInputElement
    const error = document.getElementById('excluded-error')

    if(svg && text) {
      if(svg.files && text.value){
        const fileId = await uploadImageToSeaweedFS(svg.files[0])
        setExcluded([ ...excluded, { text: text.value, svg: fileId }])
        svg.value = ''
        text.value = ''
        if(error)
          error.innerHTML = ''
      }
    }
    else{
      if(error)
        error.innerHTML = 'Details Incomplete'
    }

  }

  
  const deleteImageFromSeaweedFS = async (fileId: string) => {
    await fetch(`api/storage/`, {
      method: 'DELETE',
      body: JSON.stringify({ fileId: fileId })
    });
  };
  
  const handleImageDelete = async (locationIndex: number, imageIndex: number) => {
    const fileId = locations[locationIndex].images[imageIndex];
    
    await deleteImageFromSeaweedFS(fileId);
    
    const updatedLocations = locations.map((location, i) => {
      if (i === locationIndex) {
        const newImages = location.images.filter((_, imgIndex) => imgIndex !== imageIndex);
        return { ...location, images: newImages };
      }
      return location;
    });
    
    setLocations(updatedLocations);
  };
  
  const handleLocationChange = (index: number, field: keyof Location, value: string) => {
    const updatedLocations = locations.map((location, i) =>
      i === index ? { ...location, [field]: value } : location
    );
    setLocations(updatedLocations);
  };

  const addLocation = () => {
    setLocations([...locations, {
      locationName: "",
      locationDays: "",
      nights: "",
      date: "",
      locationStay: "",
      locationMeals: "",
      locationHighlight: "",
      overview: "",
      images: []
    }]);
  };

  const removeLocation = (index: number) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
  };

  const getImageUrl = (fileId: string) => {
    return `http://localhost:8080/${fileId}`;
  };
  

  async function deleteTOC(index: number) {
    const fileId = toc[index].svg
    
    await deleteImageFromSeaweedFS(fileId);
    
    const updatedTOCs = toc.filter((_, i) => i!==index);
    
    setTOC(updatedTOCs);
  }

  async function deleteIncluded(index: number) {
    const fileId = included[index].svg
    
    await deleteImageFromSeaweedFS(fileId);
    
    const updatedIncluded = toc.filter((_, i) => i!==index);
    
    setIncluded(updatedIncluded);
  }

  async function deleteExcluded(index: number) {
    const fileId = excluded[index].svg
    
    await deleteImageFromSeaweedFS(fileId);
    
    const updatedExcluded = toc.filter((_, i) => i!==index);
    
    setExcluded(updatedExcluded);
  }

  const handleCreate = async () => {
    console.log(basicInfo, locations, toc, included, excluded)
    const res = await fetch('/api/itinerary', {
      method: 'POST',
      body: JSON.stringify({
        ...basicInfo,
        locations,
        toc,
        included,
        excluded
      })
    })

    console.log(res)
  }


  return (
    <>
    <div className="md:py-3 md:px-20 px-5 py-1">
      <div className="grid grid-cols-5 gap-4">
        <div className="w-full col-span-5">
          <h4 className="text-2xl font-semibold py-2">Cover Page</h4>
          <div className="grid grid-cols-4 gap-3 ">
            <div className="grid w-full items-center gap-1.5 col-span-4">
              <Label htmlFor="title" className="text-base">Title</Label>
              <Input type="text" id="title" onChange={(e) => handleChangeBasicInfo('title', e.target.value)} placeholder="Title" className="p-6 text-lg" />
            </div>
            <div className="grid w-full items-center gap-1.5 col-span-2">
              <Label htmlFor="subTitle" className="text-base">Sub-Title</Label>
              <Input type="text" id="subTitle" placeholder="Sub-Title" onChange={(e) => handleChangeBasicInfo('subTitle', e.target.value)} className="p-6 text-lg" />
            </div>
            <div className="grid w-full items-center gap-1.5 col-span-2">
              <Label htmlFor="days" className="text-base">No. of Days</Label>
              <Input type="number" id="days" placeholder="days" onChange={(e) => handleChangeBasicInfo('days', e.target.value)} className="p-6 text-lg" />
            </div>
            <div className="grid w-full items-center gap-1.5 col-span-4">
              <Label htmlFor="overview" className="text-base">Overview</Label>
              <Textarea id="overview" placeholder="Overview" onChange={(e) => handleChangeBasicInfo('overview', e.target.value)} className="p-3 text-lg resize-none" />
            </div>
            <div className="grid w-full items-center gap-1.5 col-span-1">
              <Label htmlFor="stay" className="text-base">Stay</Label>
              <Input type="text" id="stay" placeholder="Stay" onChange={(e) => handleChangeBasicInfo('stay', e.target.value)} className="p-6 text-lg" />
            </div>
            <div className="grid w-full items-center gap-1.5 col-span-1">
              <Label htmlFor="meals" className="text-base">Meals</Label>
              <Input type="text" id="meals" placeholder="Meals" onChange={(e) => handleChangeBasicInfo('meals', e.target.value)} className="p-6 text-lg" />
            </div>
            <div className="grid w-full items-center gap-1.5 col-span-1">
              <Label htmlFor="transport" className="text-base">Transport</Label>
              <Input type="text" id="transport" placeholder="Transport" onChange={(e) => handleChangeBasicInfo('transport', e.target.value)} className="p-6 text-lg" />
            </div>
            <div className="grid w-full items-center gap-1.5 col-span-1">
              <Label htmlFor="offer" className="text-base">Offer / Highlight</Label>
              <Input type="text" id="offer" placeholder="Offer / Highlight" onChange={(e) => handleChangeBasicInfo('offer', e.target.value)} className="p-6 text-lg" />
            </div>
            <div className="grid w-full items-center gap-1.5 col-span-1">
              <Label htmlFor="client" className="text-base">Client Name</Label>
              <Input type="text" id="client" placeholder="Client Name" onChange={(e) => handleChangeBasicInfo('client', e.target.value)} className="p-6 text-lg" />
            </div>
          </div>
        </div>
        <div className="w-full col-span-5">
          <h4 className="text-2xl font-semibold py-2">Itinerary</h4>
          {locations.map((location, index) => (
            <div key={index} className="grid grid-cols-4 gap-3 border-b pb-4 mb-4">
              <div className="grid w-full items-center gap-1.5 col-span-4">
                <Label htmlFor={`locationName-${index}`} className="text-base">Location Name</Label>
                <Input
                  type="text"
                  id={`locationName-${index}`}
                  placeholder="Location Name"
                  className="p-6 text-lg"
                  value={location.locationName}
                  onChange={(e) => handleLocationChange(index, 'locationName', e.target.value)}
                />
              </div>

              {/* Repeat other location fields */}
              <div className="grid w-full items-center gap-1.5 col-span-2">
                <Label htmlFor={`locationDays-${index}`} className="text-base">No. of Location Days</Label>
                <Input
                  type="text"
                  id={`locationDays-${index}`}
                  placeholder="Location Days"
                  className="p-6 text-lg"
                  value={location.locationDays}
                  onChange={(e) => handleLocationChange(index, 'locationDays', e.target.value)}
                />
              </div>

              <div className="grid w-full items-center gap-1.5 col-span-2">
                <Label htmlFor={`nights-${index}`} className="text-base">Nights</Label>
                <Input
                  type="text"
                  id={`nights-${index}`}
                  placeholder="Nights"
                  className="p-6 text-lg"
                  value={location.nights}
                  onChange={(e) => handleLocationChange(index, 'nights', e.target.value)}
                />
              </div>

              <div className="grid w-full items-center gap-1.5 col-span-1">
              <Label htmlFor="date" className="text-base">Date</Label>
              <Input type="date" id="date" placeholder="Date" 
                onChange={(e) => handleLocationChange(index, 'date', e.target.value)}
                className="p-6 text-lg block" 
              />
            </div>
            <div className="grid w-full items-center gap-1.5 col-span-1">
              <Label htmlFor="locationStay" className="text-base">Location Stay</Label>
              <Input type="text" id="locationStay" placeholder="Location Stay" className="p-6 text-lg" 
                onChange={(e) => handleLocationChange(index, 'locationStay', e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5 col-span-1">
              <Label htmlFor="locationMeals" className="text-base">Location Meals</Label>
              <Input type="text" id="locationMeals" placeholder="Locations Meals" className="p-6 text-lg" 
                onChange={(e) => handleLocationChange(index, 'locationMeals', e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5 col-span-1">
              <Label htmlFor="locationHighligt" className="text-base">Highlight</Label>
              <Input type="text" id="locationHighligt" placeholder="Highlight" className="p-6 text-lg" 
                onChange={(e) => handleLocationChange(index, 'locationHighlight', e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5 col-span-4">
              <Label htmlFor="overview" className="text-base">Overview</Label>
              <Textarea id="overview" placeholder="Overview" className="p-3 text-lg resize-none" 
                onChange={(e) => handleLocationChange(index, 'overview', e.target.value)}
              />
            </div>

            <div className="col-span-4">
                <Label htmlFor={`locationImages-${index}`} className="text-base">Location Images</Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  id={`locationImages-${index}`}
                  className="pt-2"
                  onChange={(e) => handleImageChange(index, e)}
                />

                <div className="grid grid-cols-4 gap-2 mt-2">
                  {location.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative">
                      <Image
                        src={getImageUrl(image)}
                        alt={`Location ${index} Image ${imgIndex}`}
                        className="w-full h-32 object-fill rounded-xl"
                        height={30}
                        width={50}
                      />
                      <button
                        onClick={() => handleImageDelete(index, imgIndex)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 py-0.5 rounded"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>


              {/* Remove button */}
              <div className="col-span-4 text-right">
                <button
                  onClick={() => removeLocation(index)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remove Location
                </button>
              </div>
            </div>
          ))}

          <div className="col-span-4">
            <button
              onClick={addLocation}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add New Location
            </button>
          </div>
        </div>


        <div className="w-full col-span-5">
          <h4 className="text-2xl font-semibold py-2">Things to carry</h4>
          <div className="grid grid-cols-8 gap-3 p-5 ">
            {toc.map( (tocElement, index) => (
              <div className="relative rounded-xl shadow-lg border p-4 w-fit" key={tocElement.svg}>
                <div className="absolute top-[-0.1rem] right-2">
                  <button
                    className="absolute top-1 -right-1 text-black text-xs px-1 py-0.5 rounded-full"
                    onClick={() => deleteTOC(index)}
                  >
                    X
                  </button>
                </div>  
                <div>
                  <Image src={getImageUrl(tocElement.svg)} alt="" className="rounded-xl" width={65} height={65} />
                  <h4 className="flex items-center justify-center">{tocElement.text}</h4>
                </div>
              </div>
            ))}
          </div>
          <div className="p-5 flex gap-3">
            <div>
              <div className="relative rounded-xl shadow-lg border p-4 w-fit">
                <div>
                  <Image src={ svgTOC.svg ? getImageUrl(svgTOC.svg) : BK} alt="" className="rounded-xl" width={65} height={65} />
                  <h4 className="flex items-center justify-center">{svgTOC.text}</h4>
                </div>
              </div>
            </div>
            <div className="flex gap-3 flex-col">
              <Input
                type="file"
                accept="image/*"
                multiple
                id={`toc-svg`}
                onChange={(e) => handleAddNewSVG(e)}
                className="pt-2"
              />
              <Label htmlFor="toc-name text-base">Name</Label>
              <Input
                type="text"
                id={`toc-name`}
                placeholder="Name"
                onChange={(e) => handleAddNewSVGName(e)}
                className="p-6 text-base"
              />
            </div>
            <div>
              <Button onClick={handleAddTOC}>Add</Button>
              <h4 id="toc-error" className="mt-2.5 text-red-600"></h4>
            </div>
          </div>
        </div>

        <div className="w-full col-span-5">
          <h4 className="text-2xl font-semibold py-2">What you will get</h4>
          <div className="p-5 flex flex-col gap-3">
            <div>
              <div className="text-lg font-semibold">
                Included
              </div>
              <div className="flex flex-col gap-5 w-full">
                {included.map((inc, index) => (
                  <div className="flex items-center gap-5 p-1 w-full" key={inc.svg}>
                    <div className="relative rounded-xl shadow-lg border p-2 w-fit">
                      <div >
                        <Image src={getImageUrl(inc.svg)} alt="" className="rounded-xl" width={40} height={40} />
                      </div>
                    </div>
                    <div>
                      <h4 className="flex items-center justify-center text-lg">{inc.text}</h4>
                    </div>
                    <div className="ml-auto">
                      <button
                        className=""
                        onClick={() => deleteIncluded(index)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))} 
              </div>
            </div>
            <div className="flex gap-3 flex-col">
              <Input
                type="file"
                accept="image/*"
                multiple
                id={`included-svg`}
                // onChange={(e) => handleIncluded('svg', e)}
                className="pt-2"
              />
              <Label htmlFor="toc-name text-base">Name</Label>
              <Input
                type="text"
                id={`included-name`}
                placeholder="Name"
                // onChange={(e) => handleIncluded('text', e)}
                className="p-6 text-base"
              />
            </div>
            <div>
              <Button onClick={handleAddIncluded}>Add</Button>
              <h4 id="included-error" className="mt-2.5 text-red-600"></h4>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-3">
            <div>
              <div className="text-lg font-semibold">
                Excluded
              </div>
              <div className="flex flex-col gap-5 w-full">
                {excluded.map((exc, index) => (
                  <div className="flex items-center gap-5 p-1 w-full" key={exc.svg}>
                    <div className="relative rounded-xl shadow-lg border p-2 w-fit">
                      <div >
                        <Image src={getImageUrl(exc.svg)} alt="" className="rounded-xl" width={40} height={40} />
                      </div>
                    </div>
                    <div>
                      <h4 className="flex items-center justify-center text-lg">{exc.text}</h4>
                    </div>
                    <div className="ml-auto">
                      <button
                        className="absolute top-1 -right-1 text-black text-xs px-1 py-0.5 rounded-full"
                        onClick={() => deleteExcluded(index)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))} 
              </div>
            </div>
            <div className="flex gap-3 flex-col">
              <Input
                type="file"
                accept="image/*"
                multiple
                id={`excluded-svg`}
                // onChange={(e) => handleAddNewSVG(e)}
                className="pt-2"
              />
              <Label htmlFor="toc-name text-base">Name</Label>
              <Input
                type="text"
                id={`excluded-name`}
                placeholder="Name"
                // onChange={(e) => handleAddNewSVGName(e)}
                className="p-6 text-base"
              />
            </div>
            <div>
              <Button onClick={handleAddExcluded}>Add</Button>
              <h4 id="excluded-error" className="mt-2.5 text-red-600"></h4>
            </div>
          </div>
        </div>

        <div className="flex flex-row-reverse col-span-5">
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </div>
    </div>      
    </>
  )
}